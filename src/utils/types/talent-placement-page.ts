/** @format */

export interface TalentModelItem {
  title: string;
  description: string;
}

export interface MatrixImage {
  url: string;
  public_id: string;
}

export interface MatrixItem {
  title: string;
  image?: MatrixImage | null;
}

export interface TalentRoleItem {
  title: string;
  points?: string[];
  thumbnail?: MatrixImage | null;
  wa_message?: string;
}

export interface TalentPlacementCta {
  title: string;
  description: string;
  label: string;
  wa_message?: string;
}

export interface TalentPlacementPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    models?: TalentModelItem[];
    matrix?: {
      title?: string;
      description?: string;
      items?: MatrixItem[];
    };
    roles?: TalentRoleItem[];
    cta?: TalentPlacementCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}