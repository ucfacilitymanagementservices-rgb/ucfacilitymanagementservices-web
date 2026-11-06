import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  canonicalPath?: string;
}

const SITE_URL = 'https://ucfms.in';
const DEFAULT_TITLE = 'UCFMS | Facility Management, Security & Housekeeping Services';
const DEFAULT_DESCRIPTION =
  'UC Facility Management Services provides professional security, housekeeping, cleaning, and facility management solutions. Contact UCFMS to discuss your requirements.';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSeo({ title, description, canonicalPath }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title === DEFAULT_TITLE ? title : `${title} | UCFMS`;
    const canonical = `${SITE_URL}${canonicalPath || ''}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:site_name', 'UC Facility Management Services');
    upsertMeta('property', 'og:type', 'website');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
  }, [title, description, canonicalPath]);
}

export const SEO_DEFAULTS = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  siteUrl: SITE_URL,
};
