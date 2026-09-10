/** @format */

export interface AppDevelopmentTeamSize {
  quantity: number;
  type: string;
}

export interface AppDevelopmentHighlight {
  image: string;
  title: string;
  description: string;
}

export interface AppDevelopmentProps {
  _id: string;
  title: string;
  tech_stack: string[];
  description: string;
  banner?: { url: string; public_id?: string } | null;
  challenge?: string;
  team_size: AppDevelopmentTeamSize[];
  timeline: number;
  methodology?: string;
  compliance?: string;
  highlights: AppDevelopmentHighlight[];
  created_at?: string;
}

export interface AppDevelopmentListResponse {
  status: number;
  message: string;
  data: AppDevelopmentProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface AppDevelopmentListParams {
  page?: number;
  limit?: number;
  tech_stack?: string;
  methodology?: string;
  search?: string;
}

export interface AppDevelopmentOption {
  value: string;
  label: string;
}

export interface AppDevelopmentFilterOptions {
  tech_stacks: AppDevelopmentOption[];
  methodologies: AppDevelopmentOption[];
}
