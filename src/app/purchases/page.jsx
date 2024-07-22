'use client';

import AddLocation from '@/components/AddLocation/AddLocation'
import Link from 'next/link';
import React, { useState } from 'react'

const Purchase = () => {

  const [addLocation, setAddLocation] = useState(false)

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3'>
        <Link href={'/purchases/add'}>
          <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Purchase</button>
        </Link>
        <button 
        onClick={() => {
          setAddLocation(!addLocation)
        }}
        className='px-3 py-2 bg-red-600 text-white text-sm shadow-md shadow-red-600/50 rounded-md'>Add Location</button>
      </div>
      <div className={`w-80 bg-white rounded-md overflow-hidden transition-all shadow-md ${addLocation ? 'h-fit p-4' : 'h-0'}`}>
        <AddLocation />
      </div>
    </div>
  )
}

export default Purchase