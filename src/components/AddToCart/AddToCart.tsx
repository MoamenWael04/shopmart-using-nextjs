"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";
//

export default function AddToCart({ productId }: { productId: String }) {
    const [isLoading, setIsLoading] = useState(false);
    const {getCart ,setCartData} = useContext(cartContext)
  async function addProductToCart() {
    setIsLoading(true)
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "POST",
        body: JSON.stringify({productId}),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmEwZDcxODRkOTUwYzkwMjM2Zjk3YyIsIm5hbWUiOiLZhdik2YXZhiDZiNin2KbZhCDYtdin2KjYsSDYudmE2YkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc2NDQ0NzkzMywiZXhwIjoxNzcyMjIzOTMzfQ.X6wvCgUa4Js6PysHGQnwgVPCcrlr6OOkfl1F86gQQn0",
            'content-type':'application/json'
        },
      }
    )
    const data = await response.json();
    // console.log(data);
    setIsLoading(false)
    setCartData(data)
    // getCart()
    data.status == 'success' && toast.success("product added successfully")

  }

  return (
    <>
      <CardFooter className="gap-2">
        <Button onClick={addProductToCart} className="grow">
          {
            isLoading?<Loader className="animate-spin"/>:<ShoppingCart />
          } Add to Cart
        </Button>
        <Heart />
      </CardFooter>
    </>
  );
}
