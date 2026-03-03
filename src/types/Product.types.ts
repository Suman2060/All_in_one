export interface ProductRating {
    rate: number
    count: number
}


// single product detail
export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: ProductRating
}


//  category 
export type Category = string;

export type Categories = Category[]



// sorttng option category type
export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "rating";


  export interface ProdoutCardProps {
    product: Product
  }

export interface StarRatingProps {
    rating: number;
    size?: number
}

// cart typre
export interface CartItem extends Product {
  quantity: number
}

export interface CartSummary {
  totalItems: number
  totalPrice: number
  totalDiscount: number
}