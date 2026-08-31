// product interface, for product card and product detail
export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image_url: string;
  published_date: string;
  category_name: string;
  era_name: string;
  color_name: string;
  condition_name: string;
  size: string;
  description: string;
  sku: string;
}