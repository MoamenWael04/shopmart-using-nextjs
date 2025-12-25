import { ProductI } from "@/Interfaces";

export async function getAllProductsAction(){
    const productResponse = await fetch('https://ecommerce.routemisr.com/api/v1/products');
      const {data:products}:{data:ProductI[]} = await productResponse.json();
      return products;
}