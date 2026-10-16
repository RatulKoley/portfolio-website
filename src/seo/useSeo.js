import { useEffect } from "react";
import { portfolio } from "../data/portfolio";

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Per-route head management (title, description, OG, canonical, JSON-LD).
 * jsonLd: an object or array of objects; a matching script#jsonld-id is
 * replaced each render so routes don't accumulate stale entries.
 */
export function useSeo({ title, description, path = "", jsonLd, jsonLdId = "route-jsonld" }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${portfolio.name}` : portfolio.metaTitle;
    document.title = fullTitle;
    setMeta("name", "description", description || portfolio.metaDescription);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description || portfolio.metaDescription);
    setMeta("property", "og:url", `https://ratulkoley.dpdns.org${path}`);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://ratulkoley.dpdns.org${path || "/"}`;

    const existing = document.getElementById(jsonLdId);
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = jsonLdId;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, jsonLd, jsonLdId]);
}

/** Person JSON-LD reused by several routes. */
export const personJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  jobTitle: "Full Stack Developer & Team Lead",
  url: portfolio.website,
  email: `mailto:${portfolio.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressCountry: "IN" },
});
