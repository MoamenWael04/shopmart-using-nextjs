'use client'
import Loading from '@/app/loading'
import { cartContext } from '@/components/Context/CartContext'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import React, { useContext } from 'react'

export default function Cart() {
   const {cartData , isLoading , getCart} = useContext(cartContext);
   typeof cartData?.data.products[0].product == 'string' && getCart();
  return <>
  {isLoading || typeof cartData?.data.products[0].product == 'string'
  ?<Loading/>:
    <div className="container mx-auto py-6 px-4">
  <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

  <p className="text-muted-foreground mt-1">
    {cartData?.numOfCartItems} items in your cart
  </p>

  {/* GRID LAYOUT */}
  <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start mt-6 gap-3 ">

    {/* ITEMS WRAPPER (2 COLUMNS) */}
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

            {/* TITLE + PRICE */}
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

            {/* QUANTITY + REMOVE */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  aria-label="decrease"
                  className="size-8 bg-accent rounded-lg border text-accent-foreground hover:bg-accent"
                >
                  -
                </Button>

                <span className="w-6 text-center font-medium">{item.count}</span>

                <Button
                  aria-label="increase"
                  className="size-8 bg-accent rounded-lg border text-accent-foreground hover:bg-accent"
                >
                  +
                </Button>
              </div>

              <Button
                aria-label="remove"
                className="text-sm bg-accent cursor-pointer text-destructive hover:underline hover:bg-accent flex items-center"
              >
                remove
              </Button>
            </div>

          </div>
        </div>
      ))}

    </div>

    {/* ORDER SUMMARY (1 COLUMN) */}
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

        <Button className="w-full text-lg mt-4">proceed to CheckOut</Button>
        <Button className="w-full text-lg mt-2">continue Shopping</Button>
      </div>

      <Button
        variant="outline"
        className="mt-2 ms-auto text-destructive hover:text-destructive flex"
      >
        <Trash /> Clear Cart
      </Button>
    </div>

  </div>
</div>

  }
  
  
  
  
  
  
  
  </>
}
