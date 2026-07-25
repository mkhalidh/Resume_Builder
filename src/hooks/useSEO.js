import { useEffect } from "react";

export const SITE_URL = "https://resume-builder-mkhalidh.vercel.app";

const setMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const JSONLD_ID = "route-jsonld";

const setJsonLd = (data) => {
  let el = document.getElementById(JSONLD_ID);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = JSONLD_ID;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

// Client-side per-route SEO tags. This app is a plain Vite SPA with no
// server-side rendering, so these run after mount rather than being present
// in the initial HTML — fine for Googlebot (which renders JS before
// indexing) but not for crawlers/unfurlers that only read raw HTML, which
// will see the static defaults in index.html instead.
export const useSEO = ({ title, description, path = "/", jsonLd }) => {
  useEffect(() => {
    if (title) document.title = title;

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_URL}${path}`);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    setCanonical(`${SITE_URL}${path}`);
    setJsonLd(jsonLd);

    return () => setJsonLd(null);
  }, [title, description, path, jsonLd]);
};
