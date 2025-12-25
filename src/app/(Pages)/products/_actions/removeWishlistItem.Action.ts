'use server'

import { getUserToken } from "@/app/Helpers/GetUserToken";
import { CartResponse } from "@/Interfaces";
import { WishlistResponse } from "@/Interfaces/Wishlist";

export async function removeWishlistItemAction(productId : string){
    const token = await getUserToken();
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/'+ productId,
      {
        method:"DELETE",
        headers:{
          token:token!,
        }
      }
    )
    const data:WishlistResponse = await response.json();
    return data ;
}