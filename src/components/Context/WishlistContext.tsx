'use client'

import { getWishlistAction } from "@/app/(Pages)/products/_actions/getwishList.Action";
import { WishlistResponse } from "@/Interfaces/Wishlist";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";


export const wishlistContext = createContext<{
    wishlistData:WishlistResponse|null,
    setWishlistData:(value:WishlistResponse|null)=>void,
    setIsLoading:(value:boolean)=>void,
    isLoading:boolean,
    getWishlist:()=>void,
}>({
wishlistData:null,
setWishlistData: () => {},
isLoading:false,
setIsLoading:()=>{},
getWishlist:()=>{}

});



export default function WishlistContextProvider({children}:{children:ReactNode}){
    const [wishlistData, setWishlistData] = useState<null|WishlistResponse>(null)
    const [isLoading, setIsLoading] = useState(false)


    const getWishlist = useCallback(async () => {
        setIsLoading(true);
        const data = await getWishlistAction();
        setWishlistData(data);
        console.log(data);
        setIsLoading(false)
        
    }, [])

    useEffect(()=>{
        getWishlist()
    },[])





    return <wishlistContext.Provider value={{wishlistData , setWishlistData , isLoading , setIsLoading , getWishlist}}>
               {children}
       </wishlistContext.Provider>
}