'use server'

import { getUserToken } from "@/app/Helpers/GetUserToken";
import { CartResponse } from "@/Interfaces";

export async function updateCartItemAction(productId:string , count:number){
        const token = await getUserToken();

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ productId,
      {
        body:JSON.stringify({count}),
        method:"PUT",
        headers:{
            token:token!,
          'content-type':'application/json'
        }
      }
    )
    const data:CartResponse = await response.json();
    return data
}