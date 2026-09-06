/** @format */

export interface CourseCatalogCta {
  title: string;
  description: string;
  label: string;
  link: string;
}

export interface CourseCatalogPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    cta?: CourseCatalogCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}