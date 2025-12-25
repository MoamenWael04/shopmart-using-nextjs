'use client'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  return <>
  <div className="min-h-[75vh] ">
    <div className="container flex flex-col justify-center items-center gap-3 w-3/5 mx-auto pt-15">
    <h2>Hi , {session.data?.user.name}</h2>
    <h6 className="font-bold text-6xl">Welcome to ShopMart</h6>
    <p className="text-xl text-gray-600 text-center">Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.</p>
    <div className="flex justify-center items-center p-10 gap-3">
      <Button  className="py-6 px-8 text-md"><Link href={'/products'}>Shop Now</Link></Button>
      <Button variant='outline' className="py-6 px-8 text-md border-black"><Link href={'/categories'}>Browse Categories</Link></Button>
    </div>
    </div>
  </div>
  
 
  
  </>
}
