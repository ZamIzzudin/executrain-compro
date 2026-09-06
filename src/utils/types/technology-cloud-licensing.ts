/** @format */

export interface LicensingImage {
  url: string;
  public_id: string;
}

export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface LicensingVendor {
  name: string;
  logo: LicensingImage | null;
  description: string;
  website_url: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  contact_link: string;
}

export interface TechnologyCloudLicensingPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    tech?: {
      title?: string;
      logos?: (LicensingImage | null)[];
    };
    faq?: {
      title?: string;
      questions?: FaqQuestion[];
    };
    vendors?: LicensingVendor[];
    cta?: {
      title?: string;
      description?: string;
      label?: string;
      link?: string;
    };
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Buat slug untuk route detail vendor (contoh: "Sophos" -> "sophos"). */
export function slugifyVendorName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}