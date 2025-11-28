import { ProductI } from '@/Interfaces';
import { Params } from 'next/dist/server/request/params'
import React from 'react'

export default async function ProductDetails({params}:{params:Params}) {
// console.log(await params);
let {productId} = await params;

const response = await fetch("https://ecommerce.routemisr.com/api/v1/products/"+productId);
const {data : product}:{data : ProductI} = await response.json();






  return <></>
}
