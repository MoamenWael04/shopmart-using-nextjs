import { CategoryI, ProductI } from '@/Interfaces';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import { getAllProductsAction } from '../../products/_actions/getAllProducts.Action';
import AddToCart from '@/components/AddToCart/AddToCart';
import MyStar from '@/components/Mystar/MyStar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export default async function SpecificCategory({params}:{params:Params}) {
  let {specificCategory} = await params;
  // console.log(specificCategory);
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/categories/'+ specificCategory);
      const {data:category}:{data:CategoryI}=await response.json();
      let products : ProductI[] = await getAllProductsAction();



      return <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:gris-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
  {products.map((product)=>
    product.category?._id == category?._id
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
