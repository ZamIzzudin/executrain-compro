/** @format */

export interface CaseStudyTeamSize {
  quantity: number;
  type: string;
}

export interface CaseStudyTestimonial {
  testimoni: string;
  name: string;
  company: string;
}

export interface CaseStudyProps {
  _id: string;
  title: string;
  category?: string;
  description: string;
  industries: string[];
  solutions: string[];
  deployment_type?: string;
  timeline: number;
  compliance?: string;
  methodology?: string;
  team_size: CaseStudyTeamSize[];
  testimonial: CaseStudyTestimonial;
  link?: string;
  created_at?: string;
}

export interface CaseStudyListResponse {
  status: number;
  message: string;
  data: CaseStudyProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface CaseStudyListParams {
  page?: number;
  limit?: number;
  category?: string;
  industry?: string;
  solution?: string;
  deployment_type?: string;
  methodology?: string;
  search?: string;
  sort?: string;
}

export interface CaseStudyOption {
  value: string;
  label: string;
}

export interface CaseStudyFilterOptions {
  categories: CaseStudyOption[];
  industries: CaseStudyOption[];
  solutions: CaseStudyOption[];
  methodologies: CaseStudyOption[];
  deployments: CaseStudyOption[];
}
