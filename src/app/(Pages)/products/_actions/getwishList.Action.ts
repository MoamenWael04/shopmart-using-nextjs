'use server'

import { getUserToken } from "@/app/Helpers/GetUserToken"
import { WishlistResponse } from "@/Interfaces/Wishlist";


export async function getWishlistAction(){
    const token = await getUserToken();
    const response = await fetch ('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers:{
            token : token!,
        }
    })

    const data:WishlistResponse = await response.json();
    return data;
}