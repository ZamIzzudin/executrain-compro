/** @format */

export interface CapabilityItem {
  title: string;
  description: string;
}

export interface CustomAppDevelopmentCta {
  title: string;
  description: string;
  label: string;
  link: string;
}

export interface CustomAppDevelopmentPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    capabilities?: {
      title?: string;
      items?: CapabilityItem[];
    };
    cta?: CustomAppDevelopmentCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}