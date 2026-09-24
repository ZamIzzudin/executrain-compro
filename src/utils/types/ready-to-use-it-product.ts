/** @format */

export interface DeliverableItem {
  title: string;
  description: string;
}

export interface ReadyToUseITProductCta {
  title: string;
  description: string;
  label: string;
  wa_message?: string;
}

export interface ReadyToUseITProductPageDataProps {
  _id?: string;
  id?: string;
  code: string;
  title: string;
  content: {
    title_page?: string;
    description_page?: string;
    deliverables?: {
      title?: string;
      items?: DeliverableItem[];
    };
    cta?: ReadyToUseITProductCta;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}