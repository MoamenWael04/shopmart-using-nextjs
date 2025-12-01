import { ProductI } from '@/Interfaces';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import MyStar from '@/components/Mystar/MyStar';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';

import ProductSlider from "@/components/ProductSlider/ProductSlider";
import AddToCart from "@/components/AddToCart/AddToCart";







export default async function ProductDetails({params}:{params:Params}) {
let {productdetails} = await params;



const response = await fetch("https://ecommerce.routemisr.com/api/v1/products/"+productdetails);

  const {data:product}:{data:ProductI} = await response.json();
  
  


  return <>
  <Card className='grid md:grid-cols-2 items-center w-12/20 mx-auto mt-20 p-0'>
    <div>
      <ProductSlider images={product.images} title={product.title}/>
    </div>
    <div>
      <CardHeader className='mb-3'>
      <CardDescription>{product.brand.name}</CardDescription>
      <CardTitle>{product.title}</CardTitle>
      <CardDescription>{product.description}</CardDescription>
    </CardHeader>


    <CardContent className='mb-4'>
      <CardDescription className='mb-2'>{product.category.name}</CardDescription>
      <div className="flex gap-1 mb-3">
        <MyStar/>
        <MyStar/>
        <MyStar/>
        <MyStar/>
        ({product.ratingsQuantity})
      </div>
      <div>
        <p className='font-bold'>{product.price} EGP</p>
        <p className='font-bold'>Quantity left : {product.quantity}</p>
      </div>
    </CardContent>


    <AddToCart productId={product._id}/>
    </div>




  
</Card>
  
  
  </>
}
