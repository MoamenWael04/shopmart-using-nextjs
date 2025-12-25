
'use client'

import Loading from '@/app/loading';
import AddToCart from '@/components/AddToCart/AddToCart';
import { wishlistContext } from '@/components/Context/WishlistContext'
import MyStar from '@/components/Mystar/MyStar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductI } from '@/Interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { removeWishlistItemAction } from '../products/_actions/removeWishlistItem.Action';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Wishlist() {
  const {wishlistData,setWishlistData,isLoading,setIsLoading,getWishlist} = useContext(wishlistContext);
  const [removingId, setRemovingId]  = useState<null|string>(null);
  

        useEffect(() => {
        getWishlist();
        }, []);
    

  async function removeWishlistItem(productId:string){
    setRemovingId(productId);
    const data = await removeWishlistItemAction(productId)
    if (data.status == 'success') {
      toast.success('product removed from your cart')
      setWishlistData(data);
      getWishlist();
    }    
    setRemovingId(null);

  }



  return <>
  {isLoading ? <Loading/> : wishlistData?.count!>0 ? 
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
    {
       wishlistData?.data.filter(product => product).map((product)=>
      <div key={product._id || Math.random()}>
      <Card className='relative' >
      <Link href={'/products/'+ (product._id || '')}>
          {product.imageCover && (
            <Image
              className="w-full"
              src={product.imageCover}
              width={300}
              height={300}
              alt={product.title || 'Product'}
            />
          )}   
      <CardHeader>
        <CardDescription>{product.brand?.name}</CardDescription>
        <CardTitle>{product.title?.split(' ' ,3).join(" ")}</CardTitle>
        <CardDescription>{product.category?.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex'>
        <MyStar/>
        <MyStar/>
        <MyStar/>
        <MyStar/>
         <div className="ps-2">
         {product.ratingsAverage || 0}
         </div>
        </div>
      </CardContent>
      </Link>
      <AddToCart productId={product._id || ''}/>
      <Trash onClick={() => removeWishlistItem(product._id)} className='absolute top-8 left-5 cursor-pointer '/>

      </Card>
      </div>)
    }
  </div>:
  
<div className="flex min-h-[75vh] items-center justify-center flex-col gap-5 ">
      <h2 className='text-3xl'>your wishlist is empty ... </h2>
      <Link href={'/products'}>
      <Button> add products to your wishlist
        </Button>
        </Link>


</div>
  }
  </>
}
