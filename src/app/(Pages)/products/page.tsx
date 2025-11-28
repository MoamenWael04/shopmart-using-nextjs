import { ProductI } from '@/Interfaces';
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
import Link from 'next/link';

export default async function Products() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
  const {data:products}:{data:ProductI[]} = await response.json();
  // console.log(products);
  
  
  return <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gris-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
  {products.map((product)=>
       <div key={product._id}>
      <Card >
      <Link href={'/products/'+product._id}>
       <Image className='w-full' src={product.imageCover} width={300} height={300} alt={product.title}/>
      <CardHeader>
        <CardDescription>{product.brand.name}</CardDescription>
        <CardTitle>{product.title.split(' ' ,3).join(" ")}</CardTitle>
        <CardDescription>{product.category.name}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex'>
        <MyStar/>
        <MyStar/>
        <MyStar/>
        <MyStar/>
         <div className="ps-2">
         {product.ratingsAverage}
         </div>
        </div>
      </CardContent>
      </Link>



      <CardFooter className='gap-2'>
        <Button className='grow'><ShoppingCart /> Add to Cart</Button>
        <Heart />
      </CardFooter>
      </Card>
  </div>

)}
  </div>

  
  
  </>
}
