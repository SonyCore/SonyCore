import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { posts } from "@/blog/loader";
import { useLocale } from "@/hooks/use-locale";

export function Blog() {
  const { t } = useLocale();

  return (
    <Section id="blog" eyebrow={t.section.writing} title={t.section.blogTitle}>
      {posts.length === 0 ? (
        <p className="font-mono text-sm text-subtle">{t.blog.noPosts}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 60} className="h-full">
              <Link
                to={`/blog/${post.slug}`}
                aria-label={post.title}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-200 hover:border-input focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
              >
                <div className="panel-head">
                  <span dir="ltr">{post.date}</span>
                  <span className="text-faint">
                    {post.readingMinutes} {t.blog.minRead}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <h3 className="line-clamp-2 text-base font-medium leading-snug tracking-[-0.01em] transition-colors group-hover:text-brand">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-subtle transition-colors group-hover:text-foreground">
                      {t.blog.readMore}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
