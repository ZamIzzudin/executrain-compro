/** @format */

export interface AdvisoryWorkItem {
  title: string;
  description: string;
}

export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface TechAdvisoryCta {
  title: string;
  description: string;
  label: string;
  link: string;
}

export interface TechAdvisoryPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    advisory_work?: {
      title?: string;
      items?: AdvisoryWorkItem[];
    };
    advisory_support?: {
      title?: string;
      points?: string[];
    };
    faq?: {
      title?: string;
      questions?: FaqQuestion[];
    };
    boundaries?: {
      points?: string[];
    };
    cta?: TechAdvisoryCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}