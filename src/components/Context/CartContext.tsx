
'use client'
import { getCartAction } from "@/app/(Pages)/products/_actions/getCart.Action";
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
        const data = await getCartAction();
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