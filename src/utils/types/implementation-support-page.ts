/** @format */

export interface ImageValue {
  url: string;
  public_id: string;
}

export interface WorkflowStepItem {
  title: string;
  description: string;
}

export interface SupportItem {
  title: string;
  description: string;
  points?: string[];
  thumbnail?: ImageValue | null;
  wa_message?: string;
}

export interface ImplementationSupportCta {
  title: string;
  description: string;
  label: string;
  wa_message?: string;
}

export interface ImplementationSupportPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    workflow?: {
      title?: string;
      description?: string;
      steps?: WorkflowStepItem[];
    };
    support?: {
      title?: string;
      items?: SupportItem[];
    };
    cta?: ImplementationSupportCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}