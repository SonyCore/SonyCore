import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Section } from "@/components/section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { posts } from "@/blog/loader";
import { useLocale } from "@/hooks/use-locale";

export function Blog() {
  const { t } = useLocale();

  return (
    <Section id="blog" eyebrow={t.section.writing} title={t.section.blogTitle}>
      {posts.length === 0 ? (
        <div className="mx-auto max-w-xl text-center text-muted-foreground">
          {t.blog.noPosts}
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link
                to={`/blog/${post.slug}`}
                aria-label={post.title}
                className="group block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Card className="flex h-full flex-col transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-lg leading-snug">
                      {post.title}
                    </CardTitle>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3" />
                        <span dir="ltr">{post.date}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Clock className="h-3 w-3" />
                        {post.readingMinutes} {t.blog.minRead}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4 pt-0">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="font-mono text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="pointer-events-none text-primary"
                      >
                        <span>
                          {t.blog.readMore}
                          <ArrowRight className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
