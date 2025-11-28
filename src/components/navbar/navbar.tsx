import { BatteryFull, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
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

export default function Navbar() {
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
                         8
                     </Badge>
                     </Link>
                 </div>
            </div>

        </div>
    </div>
  </nav>
  
  
  
  
  </>
}
