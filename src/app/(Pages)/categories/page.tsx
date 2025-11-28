import React from 'react'
import {  CategoryI } from '@/Interfaces';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
export default async function Categories() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories",{
    method:"GET"
  })
  const {data : categories}:{data : CategoryI[]} = await response.json();



    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:gris-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {categories.map((category)=>
          <div key={category._id} className="h-80">
            <Card className="h-full">
            <div className="h-48 overflow-hidden">
              <Image className='w-full h-full object-cover' src={category.image} width={300} height={300} alt={category.name}/>
            </div>
            <CardHeader>
              <CardTitle className='text-center'>{category.name}</CardTitle>
            </CardHeader>
          </Card>
          </div>
          
          )}
          
          </div>
          </>
}
