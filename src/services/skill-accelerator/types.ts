/** @format */

export interface SkillAcceleratorItemProps {
  _id: string;
  product_name: string;
  product_category: string;
  skill_level: string;
  max_participant: number;
  product_description: string;
  benefits: string[];
  language: string;
  duration: number;
  card_type?: "course" | "skill" | "default";
  link?: string;
  banner: {
    public_id: string;
    url: string;
  };
}

export interface SkillAcceleratorListResponse {
  status: number;
  message: string;
  data: SkillAcceleratorItemProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface SkillAcceleratorListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}