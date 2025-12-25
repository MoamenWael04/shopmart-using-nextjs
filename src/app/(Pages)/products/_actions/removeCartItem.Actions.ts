'use server'

import { getUserToken } from "@/app/Helpers/GetUserToken";
import { CartResponse } from "@/Interfaces";

export async function removeCartItemAction(productId : string){
    const token = await getUserToken();
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ productId,
      {
        method:"DELETE",
        headers:{
          token:token!,
        }
      }
    )
    const data:CartResponse = await response.json();
    return data ;
}