export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;
  readingMinutes: number;
};

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n?/;

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  body: string;
} {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { data: {}, body: raw };
  const yaml = match[1];
  const body = raw.slice(match[0].length);
  const data: Record<string, unknown> = {};

  // Tiny YAML subset: scalar values + simple `key:\n  - item` lists.
  // Sufficient for blog frontmatter; not a general YAML parser.
  const lines = yaml.split("\n");
  let currentListKey: string | null = null;
  let currentList: string[] = [];

  const flushList = () => {
    if (currentListKey) {
      data[currentListKey] = currentList;
      currentListKey = null;
      currentList = [];
    }
  };

  for (const line of lines) {
    if (!line.trim()) continue;
    const listItemMatch = line.match(/^\s+-\s+(.+)$/);
    if (listItemMatch && currentListKey) {
      currentList.push(stripQuotes(listItemMatch[1].trim()));
      continue;
    }
    flushList();
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const [, key, valueRaw] = kv;
    const value = valueRaw.trim();
    if (value === "") {
      currentListKey = key;
      currentList = [];
    } else {
      data[key] = stripQuotes(value);
    }
  }
  flushList();
  return { data, body };
}

function stripQuotes(s: string): string {
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

function estimateReadingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const modules = import.meta.glob("./posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const posts: BlogPost[] = Object.entries(modules)
  .map(([path, raw]) => {
    const slug = path.replace(/^.*\/posts\/(.+)\.md$/, "$1");
    const { data, body } = parseFrontmatter(raw);
    const title = (data.title as string | undefined) ?? slug;
    const date = (data.date as string | undefined) ?? "";
    const excerpt = (data.excerpt as string | undefined) ?? "";
    const tagsRaw = data.tags;
    const tags: string[] = Array.isArray(tagsRaw)
      ? (tagsRaw as string[])
      : typeof tagsRaw === "string"
        ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [];
    return {
      slug,
      title,
      date,
      excerpt,
      tags,
      body,
      readingMinutes: estimateReadingMinutes(body),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));
