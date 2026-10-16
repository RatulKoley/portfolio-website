import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top on route change, except when target is an in-page anchor. */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
};

export const NotFound = () => (
  <div className="grid min-h-screen place-items-center">
    <div className="text-center">
      <p className="text-6xl font-semibold tracking-tight text-white">404</p>
      <p className="mt-3 text-zinc-400">That page does not exist.</p>
      <a href="/" className="mt-6 inline-block rounded-lg border border-brand bg-brand px-4 py-2.5 text-sm font-medium text-white">
        Go home
      </a>
    </div>
  </div>
);
