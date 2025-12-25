import { Heart } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { wishlistContext } from '../Context/WishlistContext';
import toast from 'react-hot-toast';
import { addToWishlistAction } from '@/app/(Pages)/products/_actions/addToWishList.Action';

export default function AddToWishlist({ productId }: { productId: string }) {

const [isLoading, setIsLoading] = useState(false);
const [isLiked, setIsLiked] = useState(false);
  const { getWishlist, setWishlistData } = useContext(wishlistContext);

  async function addProductToWishlist() {
    setIsLoading(true);
    const data =await addToWishlistAction(productId)
    // console.log(data);
    setWishlistData(data);
    getWishlist(); // Refetch to get full product data
    setIsLoading(false);
    if (data.status == "success") {
      setIsLiked(true);
      toast.success("product added successfully to wishlist");
    }
  }






  return <Heart onClick={addProductToWishlist} className={isLiked ? 'text-red-500 fill-red-500' : ''} />
}
