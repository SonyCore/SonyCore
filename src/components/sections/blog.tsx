import { Link } from "react-router-dom";
import { Section } from "@/components/section";
import { posts } from "@/blog/loader";
import { useLocale } from "@/hooks/use-locale";

export function Blog() {
  const { t } = useLocale();
  return (
    <Section id="blog" title={t.section.blogTitle}>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">{t.blog.noPosts}</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="dated-row">
              <span className="date-col">{post.date}</span>
              <div>
                <Link className="link font-sans font-semibold" to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
                <p className="text-[0.9375rem] text-muted-foreground">{post.excerpt}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
