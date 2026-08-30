import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

/**
 * Animated clustered-node backdrop for the hero.
 *
 * Nodes are scattered into organic clusters, wired to their nearest neighbours
 * within a cluster, and stitched across clusters by a sparser set of "bridge"
 * links. Signals then travel along short intra-cluster edges — mostly benign
 * (sky), occasionally a warning (amber) or an alert (red) that lights up the
 * node it lands on.
 *
 * Everything is drawn in normalized [0,1] space and scaled at paint time, so a
 * resize only re-scales — the topology is rebuilt only when the density tier
 * changes.
 */

type Node = {
  x: number;
  y: number;
  /** Origin — the drift below oscillates around this. */
  ox: number;
  oy: number;
  bxPhase: number;
  byPhase: number;
  bxFreq: number;
  byFreq: number;
  bAmp: number;
  cluster: number;
  pulsePhase: number;
  pulseFreq: number;
  isHub: boolean;
  alertUntil: number;
  /** The node the avatar sits on: pinned, undrawn, and heavily trafficked. */
  isAnchor: boolean;
};

type Edge = {
  a: number;
  b: number;
  /** Resting opacity. */
  base: number;
  breathe: number;
  breatheFreq: number;
  /** Decays back to 0; briefly brightens the edge after a signal spawns. */
  activity: number;
  isBridge: boolean;
  /** A spoke into the anchor — drawn brighter and heavier than the mesh. */
  isSpoke: boolean;
};

type Signal = {
  edge: Edge;
  /** Position along the edge, 0→1. */
  t: number;
  dir: 1 | -1;
  speed: number;
  tone: "sky" | "amber" | "red";
};

type Palette = {
  edge: string;
  bridge: string;
  node: string;
  hub: string;
  alert: string;
  sky: string;
  amber: string;
  red: string;
  /** Multiplies every line opacity — light backgrounds need more ink. */
  gain: number;
};

const PALETTES: Record<"light" | "dark", Palette> = {
  dark: {
    edge: "125, 211, 252",
    bridge: "148, 163, 184",
    node: "186, 230, 253",
    hub: "#bae6fd",
    alert: "#ef4444",
    sky: "186, 230, 253",
    amber: "245, 158, 11",
    red: "239, 68, 68",
    gain: 1,
  },
  light: {
    edge: "2, 132, 199",
    bridge: "100, 116, 139",
    node: "3, 105, 161",
    hub: "#0369a1",
    alert: "#dc2626",
    sky: "2, 132, 199",
    amber: "217, 119, 6",
    red: "220, 38, 38",
    // Sky-on-white needs a lift over sky-on-black, but only a little — past
    // ~1.5 the mesh stops being a backdrop and competes with the headline.
    gain: 1.45,
  },
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Node/cluster counts scale with area so density stays constant. */
function densityFor(w: number, h: number) {
  const area = w * h;
  // Phone-sized viewports land in the lowest tier — the same node count reads
  // as noise rather than structure once it's packed into 390px.
  if (area < 560 * 760) return { nodes: 380, clusters: 28 };
  if (area < 900 * 700) return { nodes: 700, clusters: 40 };
  if (area < 1400 * 900) return { nodes: 1100, clusters: 56 };
  return { nodes: 1500, clusters: 72 };
}

export function NodeGraph({
  className,
  anchorRef: externalAnchorRef,
}: {
  className?: string;
  /**
   * Element to pin an extra, well-connected node at — the avatar marker. Its
   * centre is measured against the canvas, so the mesh converges on wherever
   * the layout actually puts it. Edges into it are brighter and carry extra
   * traffic.
   */
  anchorRef?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Resolved at measure time, read at build time.
  const anchorRef = useRef<{ x: number; y: number } | undefined>(undefined);

  // Read by the render loop every frame, so a theme flip recolours the graph
  // without tearing down the animation.
  const paletteRef = useRef<Palette>(PALETTES[theme]);
  paletteRef.current = PALETTES[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let signals: Signal[] = [];
    /** Edges touching the anchor, kept apart so we can over-serve them. */
    let anchorEdges: Edge[] = [];

    function build(nodeCount: number, clusterCount: number) {
      nodes = [];
      edges = [];
      signals = [];
      anchorEdges = [];

      // Cluster centres, placed by best-of-8 farthest-point sampling so they
      // spread out without the rigidity of a grid.
      const margin = 0.08;
      const clusters: { x: number; y: number; radius: number; weight: number }[] =
        [];
      for (let c = 0; c < clusterCount; c++) {
        let best = { x: 0.5, y: 0.5 };
        let bestDist = -1;
        for (let attempt = 0; attempt < 8; attempt++) {
          const cand = { x: rand(margin, 1 - margin), y: rand(margin, 1 - margin) };
          let nearest = Infinity;
          for (const other of clusters) {
            const dx = cand.x - other.x;
            const dy = cand.y - other.y;
            const d = dx * dx + dy * dy;
            if (d < nearest) nearest = d;
          }
          if (nearest > bestDist) {
            bestDist = nearest;
            best = cand;
          }
        }
        clusters.push({
          x: best.x,
          y: best.y,
          radius: rand(0.09, 0.14),
          weight: rand(0.85, 1.15),
        });
      }

      // Scatter nodes into clusters, weighted. The first node to land in a
      // cluster becomes its hub: bigger, and more heavily wired.
      const totalWeight = clusters.reduce((sum, c) => sum + c.weight, 0);
      const filled = new Array(clusterCount).fill(0);
      for (let n = 0; n < nodeCount; n++) {
        let roll = Math.random() * totalWeight;
        let ci = 0;
        for (let c = 0; c < clusterCount; c++) {
          roll -= clusters[c].weight;
          if (roll <= 0) {
            ci = c;
            break;
          }
        }
        const cluster = clusters[ci];

        // Sum of two uniforms → a soft centre-weighted falloff.
        let x = cluster.x;
        let y = cluster.y;
        for (let attempt = 0; attempt < 8; attempt++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.abs(rand(-1, 1) + rand(-1, 1)) * 0.5 * cluster.radius;
          const cx = cluster.x + Math.cos(angle) * r;
          const cy = cluster.y + Math.sin(angle) * r;
          if (cx > 0.02 && cx < 0.98 && cy > 0.02 && cy < 0.98) {
            x = cx;
            y = cy;
            break;
          }
        }

        const isHub = filled[ci] === 0;
        filled[ci]++;
        nodes.push({
          x,
          y,
          ox: x,
          oy: y,
          bxPhase: Math.random() * Math.PI * 2,
          byPhase: Math.random() * Math.PI * 2,
          bxFreq: rand(0.08, 0.22),
          byFreq: rand(0.08, 0.22),
          bAmp: rand(0.003, 0.008),
          cluster: ci,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseFreq: rand(0.2, 0.55),
          isHub,
          alertUntil: 0,
          isAnchor: false,
        });
      }

      const seen = new Set<string>();
      const link = (a: number, b: number, isBridge: boolean) => {
        if (a === b) return;
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (seen.has(key)) return;
        seen.add(key);
        edges.push({
          a,
          b,
          base: isBridge ? rand(0.025, 0.065) : rand(0.04, 0.11),
          breathe: Math.random() * Math.PI * 2,
          breatheFreq: rand(0.4, 1.2),
          activity: 0,
          isBridge: isBridge,
          isSpoke: false,
        });
      };

      // Intra-cluster: wire each node to its k nearest cluster-mates.
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const degree = node.isHub ? rand(10, 18) : rand(5, 10);
        const candidates: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (j === i || nodes[j].cluster !== node.cluster) continue;
          const dx = node.ox - nodes[j].ox;
          const dy = node.oy - nodes[j].oy;
          candidates.push({ j, d: dx * dx + dy * dy });
        }
        candidates.sort((p, q) => p.d - q.d);
        const take = Math.min(candidates.length, Math.round(degree));
        for (let k = 0; k < take; k++) link(i, candidates[k].j, false);
      }

      // Cross-cluster bridges — sparse, dimmer, and never carry signals.
      const bridgeAttempts = Math.round(nodeCount * 1.4);
      for (let i = 0; i < bridgeAttempts; i++) {
        const a = Math.floor(Math.random() * nodes.length);
        const b = Math.floor(Math.random() * nodes.length);
        if (nodes[a].cluster !== nodes[b].cluster) link(a, b, true);
      }

      // The anchor: a pinned node the avatar sits on top of. It ignores
      // cluster membership and wires to whatever is nearest, so the mesh
      // visibly converges on it from every direction.
      const at = anchorRef.current;
      if (at) {
        const ai = nodes.length;
        nodes.push({
          x: at.x,
          y: at.y,
          ox: at.x,
          oy: at.y,
          bxPhase: 0,
          byPhase: 0,
          bxFreq: 0,
          byFreq: 0,
          // Pinned: the avatar is at a fixed CSS position, so any drift here
          // would tear the edges away from it.
          bAmp: 0,
          cluster: -1,
          pulsePhase: 0,
          pulseFreq: 0,
          isHub: true,
          alertUntil: 0,
          isAnchor: true,
        });

        const near: { j: number; d: number }[] = [];
        for (let j = 0; j < ai; j++) {
          const dx = at.x - nodes[j].ox;
          const dy = at.y - nodes[j].oy;
          near.push({ j, d: dx * dx + dy * dy });
        }
        near.sort((p, q) => p.d - q.d);
        // Skip the very closest few: spokes that start under the avatar have
        // no visible run before they disappear beneath it.
        const before = edges.length;
        for (let k = 3; k < Math.min(near.length, 22); k++) {
          link(ai, near[k].j, false);
        }
        anchorEdges = edges.slice(before);
        // Bright enough to stay legible through the vignette, which is at its
        // strongest this far off-centre.
        for (const e of anchorEdges) {
          e.base = rand(0.24, 0.4);
          e.isSpoke = true;
        }
      }
    }

    let tier = densityFor(800, 600);
    build(tier.nodes, tier.clusters);

    const maxSignals = () => Math.round(edges.length * 0.55);

    function spawnSignal() {
      if (edges.length === 0) return;
      // Only short, intra-cluster edges carry signals — a pulse crossing the
      // whole canvas reads as a stray line rather than as traffic.
      let edge: Edge | null = null;
      for (let tries = 0; tries < 8; tries++) {
        // Over-serve the anchor so there is always visible traffic arriving at
        // the avatar rather than the odd stray pulse.
        const pool =
          anchorEdges.length > 0 && Math.random() < 0.3 ? anchorEdges : edges;
        const cand = pool[Math.floor(Math.random() * pool.length)];
        if (cand.isBridge) continue;
        const a = nodes[cand.a];
        const b = nodes[cand.b];
        const dx = a.ox - b.ox;
        const dy = a.oy - b.oy;
        if (dx * dx + dy * dy <= 0.025) {
          edge = cand;
          break;
        }
      }
      if (!edge) return;

      const backwards = Math.random() < 0.5;
      const roll = Math.random();
      const tone: Signal["tone"] =
        roll < 0.03 ? "red" : roll < 0.1 ? "amber" : "sky";

      signals.push({
        edge,
        t: backwards ? 1 : 0,
        dir: backwards ? -1 : 1,
        speed: rand(0.005, 0.011),
        tone,
      });
      edge.activity = Math.min(1.2, edge.activity + 0.3);
      if (tone === "red") {
        nodes[edge.a].alertUntil = performance.now() + 600;
      }
    }

    let dpr = 1;
    function resize() {
      const rect = host!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.floor(width * dpr));
      canvas!.height = Math.max(1, Math.floor(height * dpr));
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Where is the avatar right now, in canvas space?
      const el = externalAnchorRef?.current;
      const previous = anchorRef.current;
      if (el && width > 0 && height > 0) {
        const box = el.getBoundingClientRect();
        anchorRef.current = {
          x: (box.left + box.width / 2 - rect.left) / width,
          y: (box.top + box.height / 2 - rect.top) / height,
        };
      } else {
        anchorRef.current = undefined;
      }
      const moved =
        !!previous !== !!anchorRef.current ||
        (previous &&
          anchorRef.current &&
          (Math.abs(previous.x - anchorRef.current.x) > 0.015 ||
            Math.abs(previous.y - anchorRef.current.y) > 0.015));

      const next = densityFor(width, height);
      if (next.nodes !== tier.nodes || moved) {
        tier = next;
        build(tier.nodes, tier.clusters);
      }
    }
    // Measure after layout has settled, so the anchor lands on the real
    // position rather than a pre-paint estimate.
    resize();
    const settle = requestAnimationFrame(resize);

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    // The marker can move without the host changing size (reflow above it on
    // narrow layouts), so watch it too.
    if (externalAnchorRef?.current) observer.observe(externalAnchorRef.current);

    function draw(now: number) {
      const p = paletteRef.current;
      ctx!.clearRect(0, 0, width, height);

      // Edges.
      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const breath = 0.5 + 0.5 * Math.sin(edge.breathe);
        const alpha = Math.min(
          1,
          (edge.base + breath * 0.05 + edge.activity * 0.22) * p.gain,
        );
        ctx!.beginPath();
        ctx!.moveTo(a.x * width, a.y * height);
        ctx!.lineTo(b.x * width, b.y * height);
        ctx!.strokeStyle = `rgba(${edge.isBridge ? p.bridge : p.edge}, ${alpha.toFixed(3)})`;
        ctx!.lineWidth = (edge.isSpoke ? 0.75 : 0.45) + edge.activity * 0.5;
        ctx!.stroke();
      }

      // Signals — a short gradient segment sliding along its edge.
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        if (s.t > 1.05 || s.t < -0.05) {
          signals.splice(i, 1);
          continue;
        }
        const a = nodes[s.edge.a];
        const b = nodes[s.edge.b];
        const t = Math.max(0, Math.min(1, s.t));
        const half = 0.09;
        const t0 = Math.max(0, t - half);
        const t1 = Math.min(1, t + half);
        const x0 = (a.x + (b.x - a.x) * t0) * width;
        const y0 = (a.y + (b.y - a.y) * t0) * height;
        const x1 = (a.x + (b.x - a.x) * t1) * width;
        const y1 = (a.y + (b.y - a.y) * t1) * height;

        const rgb =
          s.tone === "red" ? p.red : s.tone === "amber" ? p.amber : p.sky;
        const peak = s.tone === "red" ? 0.85 : s.tone === "amber" ? 0.75 : 0.75;
        const grad = ctx!.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `rgba(${rgb}, 0)`);
        grad.addColorStop(0.5, `rgba(${rgb}, ${peak})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);

        ctx!.beginPath();
        ctx!.moveTo(x0, y0);
        ctx!.lineTo(x1, y1);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = s.tone === "red" ? 1.4 : 1;
        ctx!.lineCap = "butt";
        ctx!.stroke();

        // An alert arriving lights up the node it lands on.
        if (s.tone === "red" && (s.t > 0.95 || s.t < 0.05)) {
          const target = s.dir > 0 ? nodes[s.edge.b] : nodes[s.edge.a];
          target.alertUntil = Math.max(target.alertUntil, now + 400);
        }
      }

      // Nodes.
      for (const node of nodes) {
        // The avatar marker covers the anchor — drawing it would show a dot
        // through the image's edge.
        if (node.isAnchor) continue;
        const breath = 0.5 + 0.5 * Math.sin(node.pulsePhase);
        const alerting = now < node.alertUntil;
        const r =
          (node.isHub ? 1.4 : 0.7) + breath * 0.25 + (alerting ? 0.8 : 0);
        ctx!.beginPath();
        ctx!.arc(node.x * width, node.y * height, r, 0, Math.PI * 2);
        ctx!.fillStyle = alerting
          ? p.alert
          : node.isHub
            ? p.hub
            : `rgba(${p.node}, 0.85)`;
        ctx!.globalAlpha = alerting ? 0.95 : 0.55 + breath * 0.35;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }

    // Reduced motion: paint a single resting frame and stop.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      draw(performance.now());
      const repaint = () => draw(performance.now());
      window.addEventListener("resize", repaint);
      return () => {
        cancelAnimationFrame(settle);
        observer.disconnect();
        window.removeEventListener("resize", repaint);
      };
    }

    let frame = 0;
    let last = performance.now();
    let spawnAccum = 0;
    let burstUntil = 0;
    let nextBurst = rand(4, 9);
    let running = true;

    // Don't animate an invisible tab.
    const onVisibility = () => {
      running = !document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    function tick(now: number) {
      frame = requestAnimationFrame(tick);
      if (!running) return;

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      for (const node of nodes) {
        node.bxPhase += dt * node.bxFreq;
        node.byPhase += dt * node.byFreq;
        node.x = node.ox + Math.cos(node.bxPhase) * node.bAmp;
        node.y = node.oy + Math.sin(node.byPhase) * node.bAmp;
        node.pulsePhase += dt * node.pulseFreq;
      }

      // Traffic comes in waves rather than at a flat rate.
      nextBurst -= dt;
      if (nextBurst <= 0) {
        burstUntil = now + rand(900, 1600);
        nextBurst = rand(8, 16);
      }
      const interval = now < burstUntil ? 0.012 : 0.022;
      spawnAccum += dt;
      while (spawnAccum > interval && signals.length < maxSignals()) {
        spawnAccum -= interval;
        spawnSignal();
      }

      for (const edge of edges) {
        edge.breathe += dt * edge.breatheFreq;
        edge.activity = Math.max(0, edge.activity - dt * 0.9);
      }
      for (const s of signals) s.t += s.speed * s.dir * (dt * 60);

      draw(now);
    }

    frame = requestAnimationFrame((now) => {
      last = now;
      tick(now);
    });

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(settle);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [externalAnchorRef]);

  return (
    <div ref={hostRef} aria-hidden className={className}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Vignette — keeps the graph off the headline. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, hsl(var(--background) / 0) 0%, hsl(var(--background) / 0.62) 50%, hsl(var(--background) / 0.95) 88%)",
        }}
      />
    </div>
  );
}
