import React, { HTMLElementType, useRef } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '../ui/input'
import { getUserToken } from '@/app/Helpers/GetUserToken'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function CheckOut({cartId}:{cartId:string}) {

let detailsInput = useRef<HTMLInputElement | null >(null)
let phoneInput = useRef<HTMLInputElement | null >(null)
let cityInput = useRef<HTMLInputElement | null >(null)
function cashPayment(){
 toast.success('yout Order is confirmed and out Customer service will contact with you', {
  position: "bottom-left"
});
}
async function createCashOrder(){
  const shippingAddress = {
      details:detailsInput.current?.value,
      city:cityInput.current?.value,
      phone:phoneInput.current?.value,
    }
    const token = await getUserToken();
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/'+cartId , 
       {
          method:'POST',
          body:JSON.stringify({shippingAddress}),
          headers:{
          token: token!,
          'content-type':'application/json'
          }
          
        }
    );
    const data = await response.json();
    console.log(data);

    toast.success('your order is confirmed and will be shipped soon', 
    
      {
        position : 'bottom-left'
      }
    )
    


}




 async function checkoutSession(){
  
    const shippingAddress = {
      details:detailsInput.current?.value,
      city:cityInput.current?.value,
      phone:phoneInput.current?.value,
    }
      const token = await getUserToken();
      const response= await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          method:'POST',
          body:JSON.stringify({shippingAddress}),
          headers:{
          token: token!,
          'content-type':'application/json'
          }
          
        }
      )
      const data = await response.json();
    //   console.log(data);
    if (data.status == 'success') {
        window.location.href = data.session.url;
    }      
  }
  return <>
        <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-full text-lg mt-4" variant="outline">proceed to CheckOut</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add shipping Address</DialogTitle>
            <DialogDescription>
              Make changes you enter the right information 
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label >city</Label>
              <Input ref={cityInput} id="city" />
            </div>
            <div className="grid gap-3">
              <Label >details</Label>
              <Input ref={detailsInput} id="details" />
            </div>
            <div className="grid gap-3">
              <Label >phone</Label>
              <Input ref={phoneInput} id="phone" />
            </div>

          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={checkoutSession}>Visa</Button>
            <Button type="submit" onClick={createCashOrder}><Link href={'/allorders'}>Cash</Link></Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  

  
  </>
}
