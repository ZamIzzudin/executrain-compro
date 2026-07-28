/** @format */

export interface GalleryItem {
  _id: string;
  title: string;
  image: {
    public_id: string;
    url: string;
  };
  order: number;
  is_active: boolean;
}
