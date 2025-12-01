'use client'
import { BatteryFull, Loader, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cartContext } from '../Context/CartContext'

export default function Navbar() {
   const {cartData , isLoading} = useContext(cartContext)
  return <>
  <nav className='py-4 bg-gray-100 shadow shadow-l mb-10'>
    <div className="container mx-auto">
        <div className="flex justify-between items-center">
            <h1><Link href={'./'}>Shop Mart</Link></h1>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem >
                    <NavigationMenuLink asChild >
                        <Link href="/products">Products</Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/categories">Categories</Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                        <Link href="/brands">Brands</Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className='flex items-center gap-3'>
                 <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <User />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                 <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <Link href={'./profile'}>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                                </Link>
                                <Link href={'./login'}>
                                <DropdownMenuItem>
                                    Login
                                </DropdownMenuItem>
                                </Link>
                                <Link href={'./register'}>
                                <DropdownMenuItem>
                                    Register
                                </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                       
                        </DropdownMenuContent>
                 </DropdownMenu>
                 <div className='relative'>
                    <Link href={'./cart'}>
                    <ShoppingCart />
                      <Badge className="h-5 absolute -top-3 -end-3 min-w-5 rounded-full px-1 font-mono tabular-nums">
                         {isLoading ? <Loader className='animate-spin'/> :cartData?.numOfCartItems}
                     </Badge>
                     </Link>
                 </div>
            </div>

        </div>
    </div>
  </nav>
  
  
  
  
  </>
}
