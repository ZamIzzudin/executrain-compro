/** @format */

export interface AboutJoinStep {
  title: string;
  description: string;
}

export interface AboutCta {
  title: string;
  description: string;
  label: string;
  link: string;
}

export interface AboutPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    title_about?: string;
    description_about?: string;
    vision?: string;
    mission?: string;
    awards?: string[];
    join_steps?: AboutJoinStep[];
    cta?: AboutCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}
