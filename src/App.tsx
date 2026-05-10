import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { Loading } from "@/components/loading";

const BlogPostPage = lazy(() =>
  import("@/pages/blog-post").then((m) => ({ default: m.BlogPostPage })),
);

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/blog/:slug"
            element={
              <Suspense fallback={<Loading fullScreen />}>
                <BlogPostPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
