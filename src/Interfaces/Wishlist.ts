import { ProductI } from "./Product"

export interface WishlistResponse {
  status: string
  count: number
  data: ProductI[]
}