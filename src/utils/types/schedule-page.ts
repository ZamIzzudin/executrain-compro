/** @format */

export interface ScheduleCta {
  title: string;
  description: string;
  label: string;
  wa_message?: string;
}

export interface SchedulePageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    cta?: ScheduleCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}
