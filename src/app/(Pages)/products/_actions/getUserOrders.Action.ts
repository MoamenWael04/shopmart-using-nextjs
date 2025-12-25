export async function getUserOrdersAction(cartOwner:string){
    
const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + cartOwner , {
  method:'GET'
})
const data = await response.json();
return data
}