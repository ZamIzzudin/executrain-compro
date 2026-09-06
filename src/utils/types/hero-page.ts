/** @format */

export interface HeroPageContent {
  title_page?: string;
  description_page?: string;
}

export interface HeroPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: HeroPageContent;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}