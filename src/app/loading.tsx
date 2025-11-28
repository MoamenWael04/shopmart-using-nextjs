import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { Spinner } from "@/components/ui/spinner"

export default function loading() {
  return <>
  <div className="flex items-end justify-center mt-80">
        <Spinner />
  </div>
  
  </>
}
