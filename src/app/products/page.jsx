'use client';

import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Calendar from 'react-calendar'

const Products = () => {

  const [calendarDate, setCalendarDate] = useState(new Date())

  return (
    <div>
      <div>
        <div>

        </div>
        <div>
          
        </div>
      </div>

      <hr className='text-slate-400 py-2' />

      {/* Product create section */}
      <div className='flex flex-col gap-3'>
        <h2 className='text-slate-800 font-semibold text-lg'>Products</h2>
        <div>
          <form className='flex gap-4'>
            <input 
            type="text" 
            placeholder='Product Name' 
            className='py-2 px-4 text-sm rounded-md'
            />
            <button
            className='px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md'
            >Create</button>
          </form>
        </div>
        <div className='border border-slate-200 min-w-64 md:max-w-max rounded-md flex flex-wrap gap-2 p-2'>
          <p className='box-border py-2 px-4 bg-slate-200 w-max rounded-md text-sm text-slate-500'>
            <FontAwesomeIcon icon={faTimes} width={9} className='mr-2 text-red-400 cursor-pointer' />
            Product 1
          </p>
          <p className='box-border py-2 px-4 bg-slate-200 w-max rounded-md text-sm text-slate-500'>
            <FontAwesomeIcon icon={faTimes} width={9} className='mr-2 text-red-400 cursor-pointer' />
            Product 2
          </p>
          <p className='box-border py-2 px-4 bg-slate-200 w-max rounded-md text-sm text-slate-500'>
            <FontAwesomeIcon icon={faTimes} width={9} className='mr-2 text-red-400 cursor-pointer' />
            Product 3
          </p>
          <p className='box-border py-2 px-4 bg-slate-200 w-max rounded-md text-sm text-slate-500'>
            <FontAwesomeIcon icon={faTimes} width={9} className='mr-2 text-red-400 cursor-pointer' />
            Product 4
          </p>
          <p className='box-border py-2 px-4 bg-slate-200 w-max rounded-md text-sm text-slate-500'>
            <FontAwesomeIcon icon={faTimes} width={9} className='mr-2 text-red-400 cursor-pointer' />
            Product 5
          </p>
        </div>
      </div>
    </div>
  )
}

export default Products