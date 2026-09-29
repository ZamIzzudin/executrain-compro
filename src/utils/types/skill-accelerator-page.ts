/** @format */

export interface SkillAcceleratorCta {
  title: string;
  description: string;
  label: string;
  wa_message?: string;
}

export interface SkillAcceleratorPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    title_about_psa?: string;
    description_about_psa?: string;
    points?: string[];
    cta?: SkillAcceleratorCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}
