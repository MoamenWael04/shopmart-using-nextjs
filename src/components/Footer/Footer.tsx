import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="text-gray-900 bg-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">ShopMart</h3>
            <p className="text-gray-600 mb-4">
                Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="text-gray-600 flex space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div>
                    123 Shop Street, Octoper City, DC 12345
                </div>
              </div>
              <div className="text-gray-600 flex space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>

                <div>
                    (+20) 01093333333
                </div>
              </div>
              <div className="text-gray-600 flex space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>

                <div>
                    support@shopmart.com
                </div>
              </div>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-m font-bold mb-4">SHOP</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600">Home</Link></li>
              <li><Link href="/products" className="text-gray-600">Products</Link></li>
              <li><Link href="/categories" className="text-gray-600">Categories</Link></li>
              <li><Link href="/cart" className="text-gray-600">Cart</Link></li>
              <li><Link href="/profile" className="text-gray-600">Profile</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>Help center</li>
              <li>Track your Order</li>
              <li>Returns & Exchanges</li>
              <li>Size Guide</li>
            </ul>
          </div>
          {/* About  */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ABOUT</h4>
            <ul className="space-y-2">
              <li>About shopmart</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Investor Relations</li>
              <li>Sustainability</li>
            </ul>
          </div>
          {/* polices  */}
          <div>
            <h4 className="text-lg font-semibold mb-4">POLICES</h4>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
              <li>Shipping Policy</li>
              <li>Refund Policy</li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
