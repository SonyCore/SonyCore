import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HomePage } from "@/pages/home";
import { Loading } from "@/components/loading";

const BlogPostPage = lazy(() =>
  import("@/pages/blog-post").then((m) => ({ default: m.BlogPostPage })),
);

// Split out: the resume view is only reached deliberately.
const ResumePage = lazy(() =>
  import("@/pages/resume").then((m) => ({ default: m.ResumePage })),
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
          <Route
            path="/resume"
            element={
              <Suspense fallback={<Loading fullScreen />}>
                <ResumePage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Analytics />
        <SpeedInsights />
      </div>
    </BrowserRouter>
  );
}
