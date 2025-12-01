'use client'
import React from 'react'
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay';

export default function ProductSlider({images , title }:{images:string[] , title:string}) {
  return <>
  <Carousel  
         opts={{
         align: "start",
         loop: true,
         }}
          plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        >
            <CarouselContent>
              {images.map((img,index)=>
              <CarouselItem key={img}>
              <Image className='w-full' src={img} width={300} height={300} alt={title}/>
              </CarouselItem>
              )}
            </CarouselContent>
        </Carousel>
  
  
  </>
}
