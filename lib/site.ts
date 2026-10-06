import site from "@/data/site.json";

export type SiteImage = { image: string; alt: string };

export type Site = {
  name: string;
  logo: SiteImage;
  hero: SiteImage;
  about: SiteImage;
  contact: {
    address: string;
    phone: string;
    email: string;
    opening_hours: string;
    map: string;
  };
  fitting: { length: string; guests: string; what_to_bring: string };
  accessories: (SiteImage & { name: string; one_line: string })[];
};

export function getSite(): Site {
  return site as Site;
}

/** True for values like "[PHONE]" that the owner has not filled in yet. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim()) || value.trim() === "TBC";
}
