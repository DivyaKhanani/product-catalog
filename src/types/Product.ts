export interface IProduct {
  product_id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  max_cart_quantity: number;
}

export interface ICartItem extends Partial<IProduct> {
  product_id: number;
  quantity: number;
}

export interface IInventory {
  [key: number]: number;
}

export enum LayoutType {
  GRID = "GRID",
  TABLE = "TABLE",
}
