"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { cartContext } from "../Context/CartContext";
import { addToCartActions } from "@/app/(Pages)/products/_actions/addToCart.Actions";
import AddToWishlist from "../AddtoWishlist/AddToWishlist";
//

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getCart, setCartData } = useContext(cartContext);

  async function addProductToCart() {
    setIsLoading(true);
    const data =await addToCartActions(productId)
    // console.log(data);
    setCartData(data);
    // getCart()
    setIsLoading(false);
    data.status == "success" && toast.success("product added successfully to cart");
  }

  return (
    <>
      <CardFooter className="gap-2">
        <Button onClick={addProductToCart} className="grow">
          {isLoading ? <Loader className="animate-spin" /> : <ShoppingCart />}{" "}
          Add to Cart
        </Button>
        <AddToWishlist productId={productId} />
      </CardFooter>
    </>
  );
}
