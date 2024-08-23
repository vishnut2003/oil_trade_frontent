'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const BargainTransfer = () => {

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3'>
        <Link href={'/bargain-transfer/add'}>
          <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Bargain Transfer</button>
        </Link>
      </div>

      
    </div>
  )
}

export default BargainTransfer