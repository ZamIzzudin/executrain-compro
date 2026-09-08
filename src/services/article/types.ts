/** @format */

export interface ArticleBanner {
  url: string;
  public_id: string;
}

export interface ArticleProps {
  _id: string;
  title: string;
  banner?: ArticleBanner | null;
  category: string[];
  content: string;
  created_at: string;
}

export interface ArticleListResponse {
  status: number;
  message: string;
  data: ArticleProps[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_products: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface ArticleListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
}

export interface ArticleOption {
  value: string;
  label: string;
}

export interface ArticleFilterOptions {
  categories: ArticleOption[];
}