'use server'

import { getUserToken } from "@/app/Helpers/GetUserToken";
import { Address, AddressResponse } from "@/Interfaces";
export async function getAddressAction(){
         const token = await getUserToken();
         const response = await fetch("https://ecommerce.routemisr.com/api/v1/addresses",{
            headers:{
                token : token!,
            }
        })
        const data:AddressResponse = await response.json();
        return data;
}