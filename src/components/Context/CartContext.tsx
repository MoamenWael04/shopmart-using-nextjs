
'use client'
import { CartResponse } from "@/Interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";


export const cartContext = createContext<{
    cartData:CartResponse|null,
    setCartData:(value:CartResponse|null)=>void,
    setIsLoading:(value:boolean)=>void,
    isLoading:boolean,
    getCart:()=>void,
}>({
cartData:null,
setCartData: () => {},
isLoading:false,
setIsLoading:()=>{},
getCart:()=>{}

});
export default function CartContextProvider({children}:{children:ReactNode}){
    const [cartData, setCartData] = useState<null|CartResponse>(null)
    const [isLoading, setIsLoading] = useState(false)
    async function getCart(){
        setIsLoading(true);
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmEwZDcxODRkOTUwYzkwMjM2Zjk3YyIsIm5hbWUiOiLZhdik2YXZhiDZiNin2KbZhCDYtdin2KjYsSDYudmE2YkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NDQ0NzkzMywiZXhwIjoxNzcyMjIzOTMzfQ.X6wvCgUa4Js6PysHGQnwgVPCcrlr6OOkfl1F86gQQn0",
            }
        })
        const data:CartResponse = await response.json();
        setCartData(data);
        console.log(data);  
        setIsLoading(false);

    }
    useEffect(() => {
        getCart()
    }, [])
    










    return <cartContext.Provider value={{cartData , setCartData , isLoading , setIsLoading , getCart}}>
            {children}
    </cartContext.Provider>

}