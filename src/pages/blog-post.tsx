import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { LocaleToggle } from "@/components/locale-toggle";
import { Footer } from "@/components/sections/footer";
import { posts } from "@/blog/loader";
import { resume } from "@/data/resume";
import { useLocale } from "@/hooks/use-locale";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLocale();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/#blog" replace />;
  }

  const initials = resume.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/[0.72] backdrop-blur-xl backdrop-saturate-150">
        <div className="container flex h-[60px] items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-[15px] font-medium tracking-[-0.01em]"
          >
            <Avatar className="h-7 w-7 rounded-md border border-border">
              <AvatarImage src="/avatar.png" alt={resume.name} />
              <AvatarFallback className="rounded-md bg-card font-mono text-[10px] text-subtle">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{resume.name}</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/#blog" aria-label={t.blog.allPosts}>
                <ArrowLeft className="rtl:rotate-180" /> {t.blog.allPosts}
              </Link>
            </Button>
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container max-w-3xl flex-1 py-12 md:py-16">
        <Link
          to="/#blog"
          className="mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle hover:text-foreground sm:hidden"
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" />
          {t.blog.allPosts}
        </Link>

        <article>
          <header className="mb-8 space-y-5">
            <h1 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span dir="ltr">{post.date}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingMinutes} {t.blog.minRead}
              </span>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </header>

          <Separator />

          <div className="prose-blog mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.body}
            </ReactMarkdown>
          </div>

          <Separator className="mt-12" />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <Button asChild variant="outline">
              <Link to="/#blog">
                <ArrowLeft className="rtl:rotate-180" /> {t.blog.allPosts}
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <a
                href={resume.socials.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                {t.blog.discussOnGithub} <ArrowUpRight />
              </a>
            </Button>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
