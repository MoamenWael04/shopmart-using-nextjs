'use client'

import Loading from '@/app/loading'
import CheckOut from '@/components/CheckOut/CheckOut'
import { cartContext } from '@/components/Context/CartContext'
import { Button } from '@/components/ui/button'
import { CartResponse } from '@/Interfaces'
import { Loader, Trash } from 'lucide-react'
import Link from 'next/link'

import React, { useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { removeCartItemAction } from '../products/_actions/removeCartItem.Actions'
import { updateCartItemAction } from '../products/_actions/updateCartItem.Actions'
import { clearCartAction } from '../products/_actions/clearCart.Actions'

export default function Cart() {
   const {cartData , isLoading , getCart , setCartData} = useContext(cartContext);
   const [removingId, setRemovingId]  = useState<null|string>(null);
   const [updatingId, setUpdatingId]  = useState<null|string>(null);
   const [isClearing, setIsClearing]  = useState<boolean>(false);

  // call getCart after render if cartData is missing or incorrect shape
  useEffect(() => {
    if (!cartData || typeof cartData?.data?.products?.[0]?.product === 'string') {
      getCart && getCart();
    }
  }, [cartData, getCart]);


  async function removeCartItem(productId:string){
    setRemovingId(productId);
    const data = await removeCartItemAction(productId)
    if (data.status == 'success') {
      toast.success('product removed from your cart')
      setCartData(data);
    }    
    setRemovingId(null);

  }
   async function updatingCartItem(productId:string , count:number){
    setUpdatingId(productId);
    const data = await updateCartItemAction(productId , count)
    if (data.status == 'success') {
      toast.success('product quantity updated')
      setCartData(data);
    }    
    setUpdatingId(null);

  }
   async function clearingCart(){
    setIsClearing(true);
    const data = await clearCartAction();
    console.log(data)
    if (data.message == 'success') {
      // toast.success('cart cleared successfully')
      setCartData(null);
    }    
    setIsClearing(false);

  }
 

  console.log(cartData?.cartId);
  





  return <>
  {isLoading || typeof cartData?.data?.products?.[0]?.product == 'string'
  ?<Loading/>: cartData?.numOfCartItems!>0 ?
   <div className="container mx-auto py-6 px-4">
  <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

  <p className="text-muted-foreground mt-1">
    {cartData?.numOfCartItems} items in your cart
  </p>

  <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-6 gap-3 ">

    <div className="lg:col-span-2 space-y-4">

      {cartData?.data.products.map((item) => (
        <div
          key={item._id}
          className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
        >
          <img
            src={item.product.imageCover}
            alt={item.product.title}
            className="w-24 h-24 rounded-lg object-cover mid:w-28 mid:h-24"
          />

          <div className="flex-1">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h3 className="font-medium">{item.product.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.product.brand.name} • {item.product.category.name}
                </p>
              </div>

              <div className="text-right font-semibold">
                EGP {item.price}
              </div>
            </div>

   
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                   disabled={item.count == 1}
                  onClick={()=>updatingCartItem(item.product._id , item.count -1)}
                  aria-label="decrease"
                  className="size-8 bg-accent cursor-pointer   rounded-lg border text-accent-foreground hover:bg-accent"
                >
                  -
                </Button>

                <span className="w-6 text-center font-medium">{updatingId == item.product._id?<Loader className='animate-spin'/>:item.count}</span>

                <Button
                  onClick={()=>updatingCartItem(item.product._id , item.count +1)}
                  aria-label="increase"
                  className="size-8 cursor-pointer bg-accent rounded-lg border text-accent-foreground hover:bg-accent"
                >
                  +
                </Button>
              </div>

              <Button
                onClick={()=>{removeCartItem(item.product._id)}}
                aria-label="remove"
                className="text-sm  bg-accent cursor-pointer text-destructive hover:underline hover:bg-accent flex items-center"
              >
                {removingId==item.product._id &&<Loader className='animate-spin'/>}
                remove
              </Button>
            </div>

          </div>
        </div>
      ))}

    </div>

    <div className="lg:col-span-1 sticky top-18 mt-6 lg:mt-0">
      <div className="rounded-xl border p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              subtotal : {cartData?.numOfCartItems} items
            </span>

            <span className="font-semibold">
              {cartData?.data.totalCartPrice} EGP
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Shipping</span>
            <span className="text-emerald-600 font-medium">free</span>
          </div>
        </div>

        <div className="my-4 border-t"></div>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">total</span>
          <span className="text-base font-bold">
            {cartData?.data.totalCartPrice} EGP
          </span>
        </div>

        <CheckOut  cartId={cartData?.cartId!}/>
        <Button className="w-full text-lg mt-2"><Link href={'/products'}>continue Shopping</Link></Button>
      </div>

      <Button
        onClick={clearingCart}
        variant="outline"
        className="mt-2 ms-auto text-destructive cursor-pointer hover:text-destructive flex"
      >
        <Trash /> Clear Cart
      </Button>
    </div>

  </div>
</div> :
<div className="flex min-h-[75vh] items-center justify-center flex-col gap-5 ">
      <h2 className='text-3xl'>your cart is empty ... </h2>
      <Link href={'/products'}>
      <Button> add products to your cart
        </Button>
        </Link>


</div>
  

  }
  
  
  
  
  
  
  
  </>
}
