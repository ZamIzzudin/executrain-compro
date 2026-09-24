/** @format */

export interface HomePageCta {
  title: string;
  description: string;
  label: string;
  wa_message?: string;
}

export interface HomePageServiceItem {
  title?: string;
  description?: string;
}

export interface HomePageContent {
  title_page?: string;
  description_page?: string;
  about?: {
    title?: string;
    description?: string;
  };
  services?: {
    items?: HomePageServiceItem[];
  };
  framework?: {
    items?: Record<string, string[]>;
  };
  cta?: HomePageCta;
}

export interface HomePageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: HomePageContent;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}
