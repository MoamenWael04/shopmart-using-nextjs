"use client";

import { cartContext } from '@/components/Context/CartContext';
import React, { useContext, useEffect, useState } from 'react';
import { getUserOrdersAction } from '../products/_actions/getUserOrders.Action';
import { OrderI } from '@/Interfaces';
import Loading from '@/app/loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';

export default function AllOrders() {
  const { cartData } = useContext(cartContext);
  const cartOwner = cartData?.data.cartOwner;
  const [orders, setOrders] = useState<OrderI[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (cartOwner) {
        const data = await getUserOrdersAction(cartOwner);
        console.log('Orders data:', data);
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [cartOwner]);

 

  return (
    <>
      <h3 className='text-4xl font-bold py-3.5'>All Orders</h3>
      {orders ? orders.map((order) => (
        <>
        <div key={order._id} className="container h-1/3 text-gray-600 border px-5 py-10 my-5 rounded-2xl">
          <h3  className='pb-2 text-black font-bold text-xl'>Order #{order.id}</h3>
          <p>Order Date: {order.createdAt.replace('T',', ').split('.')[0]}</p>
          <p>Payment: {order.paymentMethodType} {order.paymentMethodType == 'card' ? <span className='text-green-500'>(paid)</span> :<span className='text-red-500'>(Unpaid)</span> }</p> 
          <p>Delivered: {order.isDelivered ? <span className='text-amber-500'>Yes</span> :<span className='text-amber-500'>No</span> }</p>
          <p className='pb-5'>total: <span className='font-bold'>{order.totalOrderPrice}  EGP</span></p>
          <h3 className='text-black font-semibold'>Shipping Address</h3>
          <p>{order.shippingAddress.details} , {order.shippingAddress.city}</p>
          <p>phone: {order.shippingAddress.phone}</p>
          <DropdownMenu >
            <DropdownMenuTrigger className='m-4 p-2 font-semibold border-0 bg-gray-100 text-black rounded-lg'>View Order Items</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Order Items</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {order.cartItems.map((item)=>
              <DropdownMenuItem>
                <div className="flex gap-4">
                  <Image src={item.product.imageCover} alt={item.product.title} width={50} height={50}/>
                  <div>
                    <p className='font-semibold.'>{item.product.title.split(' ' ,2).join(" ")}</p>
                    <p className=' text-gray-600 pt-0.5'>QTY: {item.count} | price: {item.price}</p>
                  </div>
                </div>
              </DropdownMenuItem>
              )}

            </DropdownMenuContent>
          </DropdownMenu>
          <p className='text-end'>Last updated:  {order.createdAt.replace('T',', ').split('.')[0]}</p>

        </div>
        </>
      ))
    :<Loading/>}
    </>
  );
}