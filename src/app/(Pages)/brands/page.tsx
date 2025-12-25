import React from 'react'
import { BrandI } from '@/Interfaces';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';


export default async function Brands() {

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands",{
    method:"GET"
  })
  const {data : brands}:{data : BrandI[]} = await response.json();
  return <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:gris-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {brands.map((brand)=>
        <div key={brand._id}>
          <Link href={'/brands/'+brand._id}>
          <Card>
          <Image className='w-full' src={brand.image} width={300} height={300} alt={brand.name}/>
          <CardHeader>
            <CardTitle className='text-center'>{brand.name}</CardTitle>
          </CardHeader>
        </Card>
        </Link>
        </div>
        
        )}
        
        </div>
  </>
}
