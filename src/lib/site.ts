export const siteConfig = {
  name: "ARICHI GLOBAL SYNERGY LTD",
  shortName: "ARICHI GLOBAL",
  url:
    (typeof import.meta !== "undefined" &&
      (import.meta.env as Record<string, string | undefined>)["VITE_SITE_URL"]) ||
    "https://arichiglobalsynergy.com",
  description:
    "ARICHI GLOBAL SYNERGY LTD provides information technology consultancy, real estate, educational support, and agro-services.",
  email: "info@arichiglobalsynergy.com",
  phone: "+234 (0) 000 000 0000",
  locale: "en_NG" as const,
} as const;

export function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
