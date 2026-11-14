import { GitHubCalendar } from "react-github-calendar";
import { Section } from "@/components/section";
import { useTheme } from "@/hooks/use-theme";
import { useLocale } from "@/hooks/use-locale";
import { resume } from "@/data/resume";
import { ext } from "@/lib/utils";

const LIGHT = ["#eef0f3", "#c7d6ec", "#8eaedb", "#4f7fc2", "#2b5ea7"];
const DARK = ["#1d2027", "#22344f", "#2f5182", "#4f7fc2", "#7ba7e0"];

export function GitHubSection() {
  const { theme } = useTheme();
  const { t } = useLocale();
  const colors = theme === "dark" ? DARK : LIGHT;

  return (
    <Section id="github" title={t.section.githubTitle}>
      <div className="overflow-x-auto font-sans text-subtle" dir="ltr">
        <GitHubCalendar
          username="SonyCore"
          theme={{ light: colors, dark: colors }}
          colorScheme={theme}
          fontSize={11}
          blockSize={10}
          blockMargin={3}
        />
      </div>
      <p className="mt-2 font-sans text-[0.8125rem]">
        <a className="link" href={resume.socials.github} {...ext}>
          {t.github.viewProfile} →
        </a>
      </p>
    </Section>
  );
}
