import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/section";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { resume } from "@/data/resume";

const GH_USERNAME = "SonyCore";

// Sky ramp instead of GitHub green, so the graph reads as part of the page.
const lightTheme = {
  light: ["#e3e5ea", "#bae6fd", "#7dd3fc", "#38bdf8", "#0284c7"],
  dark: ["#e3e5ea", "#bae6fd", "#7dd3fc", "#38bdf8", "#0284c7"],
};

const darkTheme = {
  light: ["#12151a", "#0c4a6e", "#0369a1", "#0284c7", "#38bdf8"],
  dark: ["#12151a", "#0c4a6e", "#0369a1", "#0284c7", "#38bdf8"],
};

export function GitHubSection() {
  const { theme } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";

  const profileUrl = resume.socials.github;

  // Explicit colours rather than a canned theme — the stock ones are purple/
  // green and fight the palette.
  const streakColors = isDark
    ? {
        background: "0f1115",
        ring: "38bdf8",
        fire: "38bdf8",
        currStreakNum: "e8eaed",
        sideNums: "e8eaed",
        currStreakLabel: "a8afbb",
        sideLabels: "6b7280",
        dates: "4a5159",
      }
    : {
        background: "ffffff",
        ring: "0ea5e9",
        fire: "0ea5e9",
        currStreakNum: "12151a",
        sideNums: "12151a",
        currStreakLabel: "4a5159",
        sideLabels: "6b7280",
        dates: "9aa1ac",
      };
  const streakUrl =
    `https://streak-stats.demolab.com?user=${GH_USERNAME}&hide_border=true&` +
    new URLSearchParams(streakColors).toString();

  return (
    <Section
      id="github"
      eyebrow={t.section.activity}
      title={t.section.githubTitle}
    >
      <div className="grid gap-4">
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${t.github.viewProfile} (@${GH_USERNAME})`}
          className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 hover:border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
        >
          <div className="panel-head">
            <span className="inline-flex items-center gap-2">
              <span className="live-dot" />
              <span className="text-muted-foreground">
                {t.github.contributionGraph}
              </span>
              <span className="text-faint">· @{GH_USERNAME}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 uppercase tracking-[0.06em] transition-colors group-hover:text-foreground">
              {t.github.viewProfile}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
          <div className="overflow-x-auto p-5" dir="ltr">
            <div className="min-w-[640px]">
              <GitHubCalendar
                username={GH_USERNAME}
                theme={isDark ? darkTheme : lightTheme}
                fontSize={11}
                blockSize={12}
                blockMargin={4}
                colorScheme={isDark ? "dark" : "light"}
              />
            </div>
          </div>
        </a>

        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${t.github.viewProfile} (@${GH_USERNAME})`}
          className="group block overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 hover:border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
        >
          <div className="panel-head">
            <span>contribution streak</span>
            <span className="text-faint">github.com</span>
          </div>
          <div className="flex items-center justify-center p-5">
            <img
              src={streakUrl}
              alt={`${GH_USERNAME} contribution streak`}
              loading="lazy"
              className="h-auto w-full max-w-2xl"
            />
          </div>
        </a>
      </div>
    </Section>
  );
}
