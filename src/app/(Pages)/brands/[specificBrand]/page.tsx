import AddToCart from '@/components/AddToCart/AddToCart';
import MyStar from '@/components/Mystar/MyStar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandI, ProductI } from '@/Interfaces';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import React from 'react'
import { getAllProductsAction } from '../../products/_actions/getAllProducts.Action';
import Link from 'next/link';

export default async function SpecificBrand({params}:{params:Params}) {
    let {specificBrand} = await params;
    let products : ProductI[] = await getAllProductsAction();
    // console.log(products);
    
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/brands/'+specificBrand);
    const {data:brand}:{data:BrandI}=await response.json();
      
    
    
  return <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:gris-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
  {products.map((product)=>
    product.brand?._id == brand?._id
     && 
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



          <AddToCart productId={product._id}/>

      </Card>
  </div>
  
       

)}
  </div>
    </>
}
