'use client';

import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

const PurchaseAdd = () => {

    const [productPopup, setProductPopup] = useState(false)
    const [locationPopup, setLocationPopup] = useState(false)

    return (
        <div className='flex justify-center md:justify-start'>
            <div className='w-full max-w-96 flex flex-col gap-4'>
                <h2>Add Purchase</h2>
                <form className='w-full flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Company Bargain Date</label>
                            <input 
                            type="date" 
                            className='px-5 py-2 bg-white rounded-sm text-sm border-b border-slate-300 text-slate-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Current Date</label>
                            <input type="date" disabled className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-slate-500' value={new Date().toISOString().substring(0, 10)} />
                        </div>
                    </div>
                    <div>
                        <div className='relative'>
                            <label className='text-xs'>Products</label>
                            <div
                                onClick={() => {
                                    setProductPopup(!productPopup)
                                }}
                                className='p-3 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2' >
                                <span className='bg-slate-200 px-3 py-1 rounded-sm'>Item 1 <FontAwesomeIcon className='text-red-600 ml-2 cursor-pointer' width={10} icon={faXmark} /></span>
                                <span className='bg-slate-200 px-3 py-1 rounded-sm'>Item 2 <FontAwesomeIcon className='text-red-600 ml-2 cursor-pointer' width={10} icon={faXmark} /></span>
                                <span className='bg-slate-200 px-3 py-1 rounded-sm'>Item 3 <FontAwesomeIcon className='text-red-600 ml-2 cursor-pointer' width={10} icon={faXmark} /></span>
                                <span className='bg-slate-200 px-3 py-1 rounded-sm'>Item 4 <FontAwesomeIcon className='text-red-600 ml-2 cursor-pointer' width={10} icon={faXmark} /></span>
                                <span className='bg-slate-200 px-3 py-1 rounded-sm'>Item 5 <FontAwesomeIcon className='text-red-600 ml-2 cursor-pointer' width={10} icon={faXmark} /></span>
                            </div>
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full  shadow-md z-10 ${productPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
                                <input type="text" placeholder='Search product' className='border border-slate-300 rounded-md w-full px-5 py-2 text-sm text-slate-500' />
                                <ul className='flex gap-1 flex-col'>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 1 <FontAwesomeIcon icon={faCheck} width={15} /></li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 2</li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 3</li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 4</li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 5</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Company Bargain No.</label>
                            <input type="text" className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
                        </div>
                    </div>
                    <div>
                        <div className='relative'>
                            <label className='text-xs'>Location</label>
                            <div
                            onClick={() => {
                                setLocationPopup(!locationPopup)
                            }}
                                className='p-3 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2' >
                                <p>Select Location</p>
                            </div>
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full shadow-md ${locationPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
                                <input type="text" placeholder='Search product' className='border border-slate-300 rounded-md w-full px-5 py-2 text-sm text-slate-500' />
                                <ul className='flex gap-1 flex-col'>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 1 <FontAwesomeIcon icon={faCheck} width={15} /></li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 2</li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 3</li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 4</li>
                                    <li className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>Item 5</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Rate/Unit</label>
                            <input type="number" className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
                        </div>
                    </div>
                    
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Quantity</label>
                            <input type="number" className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
                        </div>
                    </div>
                    
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Weight in MT</label>
                            <input type="number" className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
                        </div>
                    </div>
                    <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Create Purchase</button>
                </form>
            </div>
        </div>
    )
}

export default PurchaseAdd