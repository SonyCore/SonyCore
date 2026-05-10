import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight, Github } from "lucide-react";
import { Section } from "@/components/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { resume } from "@/data/resume";

const GH_USERNAME = "SonyCore";

const lightTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
};

const darkTheme = {
  light: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export function GitHubSection() {
  const { theme } = useTheme();
  const { t } = useLocale();
  const isDark = theme === "dark";

  const profileUrl = resume.socials.github;
  const streakUrl =
    `https://streak-stats.demolab.com?user=${GH_USERNAME}` +
    `&theme=${isDark ? "tokyonight" : "default"}&hide_border=true`;

  return (
    <Section
      id="github"
      eyebrow={t.section.activity}
      title={t.section.githubTitle}
    >
      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${t.github.viewProfile} (@${GH_USERNAME})`}
        className="group mx-auto block max-w-5xl rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">
                <span>{t.github.contributionGraph}</span>
                <span className="text-muted-foreground"> · </span>
                <span className="font-mono">@{GH_USERNAME}</span>
              </CardTitle>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
              {t.github.viewProfile}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </CardHeader>
          <CardContent className="overflow-x-auto pt-0" dir="ltr">
            <div className="min-w-[640px]">
              <GitHubCalendar
                username={GH_USERNAME}
                theme={isDark ? darkTheme : lightTheme}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                colorScheme={isDark ? "dark" : "light"}
              />
            </div>
          </CardContent>
        </Card>
      </a>

      <a
        href={profileUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${t.github.viewProfile} (@${GH_USERNAME})`}
        className="group mx-auto mt-6 block max-w-5xl rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
          <CardContent className="flex items-center justify-center p-4">
            <img
              src={streakUrl}
              alt={`${GH_USERNAME} contribution streak`}
              loading="lazy"
              className="h-auto w-full max-w-2xl"
            />
          </CardContent>
        </Card>
      </a>
    </Section>
  );
}
