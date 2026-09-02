/** @format */

export interface CatalogItemProps {
  _id: string;
  product_name: string;
  product_category: string;
  skill_level: string;
  max_participant: number;
  product_description: string;
  benefits: string[];
  language: string;
  duration: number;
  framework_type?: string;
  card_type?: "course" | "skill" | "default";
  link?: string;
  banner: {
    public_id: string;
    url: string;
  };
}

export interface CatalogListResponse {
  status: number;
  message: string;
  data: CatalogItemProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface CatalogListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  framework_type?: string;
}