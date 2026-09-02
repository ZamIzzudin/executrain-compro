/** @format */

export interface ITProductHighlight {
  image: string;
  title: string;
  description: string;
}

export interface ITProductProps {
  _id: string;
  product_name: string;
  product_description: string;
  banner: {
    public_id: string;
    url: string;
  };
  tech_stack: string[];
  link?: string;
  problem?: string;
  feature: string[];
  compliance?: string;
  highlight: ITProductHighlight[];
}

export interface ITProductListResponse {
  status: number;
  message: string;
  data: ITProductProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ITProductListParams {
  page?: number;
  limit?: number;
  tech_stack?: string;
  search?: string;
}

export interface TechStackOption {
  value: string;
  label: string;
}

export interface ITProductFilterOptions {
  tech_stacks: TechStackOption[];
}
