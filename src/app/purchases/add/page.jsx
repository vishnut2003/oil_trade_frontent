'use client';

import domainName from '@/domainName';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PurchaseAdd = () => {

    const server = domainName();

    // products dropdown
    const [productPopup, setProductPopup] = useState(false);
    const [products, setProducts] = useState([])
    const [productSearch, setProductSearch] = useState('')

    // location dropdown
    const [locationPopup, setLocationPopup] = useState(false);
    const [locations, setLocations] = useState([])
    const [locationSearch, setLocationSearch] = useState('')

    const [purchaseForm, setPurchaseForm] = useState({
        location: '',
        products: [],
        bargainDate: new Date().toISOString().substring(0, 10),
        bargainNo: ''
    })

    useEffect(() => {
        axios.get(`${server}/purchase/location/get-all`)
            .then((res) => {
                setLocations(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get(`${server}/products/all`)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const submitPurchase = (e) => {
        e.preventDefault();
        axios.post(`${server}/purchase/create-purchase`, purchaseForm)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='flex justify-center md:justify-start'>
            <div className='w-full max-w-xl flex flex-col gap-4'>
                <h2>Add Purchase</h2>
                <form className='w-full flex flex-col gap-2' onSubmit={submitPurchase}>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 w-1/2'>
                            <label className='text-xs'>Company Bargain Date</label>
                            <input
                                type="date"
                                required
                                value={purchaseForm.bargainDate}
                                onChange={(e) => {
                                    setPurchaseForm({
                                        ...purchaseForm,
                                        bargainDate: e.target.value
                                    })
                                }}
                                className='px-5 py-2 bg-white rounded-sm text-sm border-b border-slate-300 text-slate-500' />
                        </div>
                        <div className='flex flex-col gap-1 w-1/2'>
                            <label className='text-xs'>Current Date</label>
                            <input type="date" required disabled className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-slate-500' value={new Date().toISOString().substring(0, 10)} />
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
                                {
                                    purchaseForm.products.length > 0 ?
                                        purchaseForm.products.map((product) => (
                                            <span className='bg-slate-200 px-3 py-1 rounded-md' key={product._id}>
                                                {product.name}
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setPurchaseForm(prevData => {
                                                            const latestProductList = prevData.products.filter((filterProduct) => {
                                                                if (filterProduct._id !== product._id) {
                                                                    return filterProduct
                                                                }
                                                            })
                                                            return {
                                                                ...prevData,
                                                                products: latestProductList
                                                            }
                                                        })
                                                    }}
                                                    className='text-red-600 ml-2 cursor-pointer'
                                                    width={10}
                                                    icon={faXmark} />
                                            </span>
                                        )) :
                                        <span className=' px-3 py-1 rounded-md'>
                                            Select products
                                        </span>
                                }
                            </div>
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full  shadow-md z-10 ${productPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
                                <input
                                    type="text"
                                    required
                                    value={productSearch}
                                    onChange={(e) => {
                                        setProductSearch(e.target.value)
                                    }}
                                    placeholder='Search product'
                                    className='border border-slate-300 rounded-md w-full px-5 py-2 text-sm text-slate-500' />
                                <ul className='flex gap-1 flex-col'>
                                    {products.filter((product) => {
                                        const searchText = productSearch.toLocaleLowerCase()
                                        const productName = product.name.toLocaleLowerCase()
                                        if (productName.includes(searchText)) {
                                            return product
                                        }
                                    }).map((product) => (
                                        <li
                                            key={product._id}
                                            onClick={() => {
                                                let productExist = false;
                                                purchaseForm.products.map((purchaseProduct) => {
                                                    if(purchaseProduct._id === product._id) {
                                                        productExist = true
                                                    }
                                                })

                                                if (!productExist) {
                                                    const { name, _id } = product
                                                    const newProduct = {
                                                        name,
                                                        _id,
                                                        price: '',
                                                        qty: '',
                                                        weightInMT: ''
                                                    }
                                                    setPurchaseForm({
                                                        ...purchaseForm,
                                                        products: [...purchaseForm.products, newProduct]
                                                    })
                                                }
                                            }}
                                            className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-sm font-semibold text-black'>{product.name}</p>
                                            </div>
                                            {/* {
                                                purchaseForm.products.includes(product.name) &&
                                                <FontAwesomeIcon icon={faCheck} width={15} className='text-blue-600' />
                                            } */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        purchaseForm.products.length !== 0 &&
                        <div className='flex flex-col gap-2 border border-slate-200 p-3 rounded-md bg-white'>
                            {purchaseForm.products.map((product) => (
                                <div className='flex flex-nowrap justify-between gap-2 items-center border-b border-slate-200 pb-2' key={product._id}>
                                    <p className='text-sm'>{product.name}</p>
                                    <div className='flex flex-nowrap gap-2'>
                                        <input
                                            type="number"
                                            required
                                            placeholder='Price'
                                            value={product.price}
                                            onChange={(e) => {
                                                setPurchaseForm(formData => {
                                                    let itemIndex;
                                                    formData.products.filter((filterProduct, index) => {
                                                        if(filterProduct._id === product._id) {
                                                            itemIndex = index
                                                        }
                                                    })

                                                    const copyFormData = [...formData.products]
                                                    copyFormData[itemIndex].price = e.target.value

                                                    const updatedFormData = {
                                                        ...formData,
                                                        products: copyFormData
                                                    }
                                                    return updatedFormData
                                                })
                                            }}
                                            className='max-w-24 w-full py-1 px-3 text-sm border border-slate-200 rounded-md'
                                        />

                                        <input
                                            type="number"
                                            required
                                            placeholder='qty'
                                            value={product.qty}
                                            onChange={(e) => {
                                                setPurchaseForm(formData => {
                                                    let itemIndex;
                                                    formData.products.filter((filterProduct, index) => {
                                                        if(filterProduct._id === product._id) {
                                                            itemIndex = index
                                                        }
                                                    })

                                                    const copyFormData = [...formData.products]
                                                    copyFormData[itemIndex].qty = e.target.value

                                                    const updatedFormData = {
                                                        ...formData,
                                                        products: copyFormData
                                                    }
                                                    return updatedFormData
                                                })
                                            }}
                                            className='max-w-24 w-full py-1 px-3 text-sm border border-slate-200 rounded-md'
                                        />
                                        
                                        <input
                                            type="number"
                                            required
                                            placeholder='W in MT'
                                            value={product.weightInMT}
                                            onChange={(e) => {
                                                setPurchaseForm(formData => {
                                                    let itemIndex;
                                                    formData.products.filter((filterProduct, index) => {
                                                        if(filterProduct._id === product._id) {
                                                            itemIndex = index
                                                        }
                                                    })

                                                    const copyFormData = [...formData.products]
                                                    copyFormData[itemIndex].weightInMT = e.target.value

                                                    const updatedFormData = {
                                                        ...formData,
                                                        products: copyFormData
                                                    }
                                                    return updatedFormData
                                                })
                                            }}
                                            className='max-w-24 w-full py-1 px-3 text-sm border border-slate-200 rounded-md'
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Company Bargain No.</label>
                            <input
                                required
                                value={purchaseForm.bargainNo}
                                onChange={(e) => {
                                    setPurchaseForm({
                                        ...purchaseForm,
                                        bargainNo: e.target.value
                                    })
                                }}
                                type="text"
                                className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
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
                                {
                                    purchaseForm.location ?
                                        <p>{purchaseForm.location.location}</p> :
                                        <p>Select Location</p>
                                }
                            </div>
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full shadow-md ${locationPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
                                <input
                                    type="text"
                                    required
                                    value={locationSearch}
                                    onChange={(e) => {
                                        setLocationSearch(e.target.value)
                                    }}
                                    placeholder='Search product'
                                    className='border border-slate-300 rounded-md w-full px-5 py-2 text-sm text-slate-500' />
                                <ul className='flex gap-1 flex-col'>
                                    {locations.filter((location) => {
                                        const search = locationSearch.toLocaleLowerCase()
                                        const locationName = location.location.toLocaleLowerCase()
                                        if (locationName.includes(search)) return location
                                    }).map((location, index) => (
                                        <li
                                            onClick={() => {
                                                setPurchaseForm({
                                                    ...purchaseForm,
                                                    location: location
                                                })
                                                setLocationPopup(false)
                                            }}
                                            key={index}
                                            className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center gap-2'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-sm text-slate-900 font-semibold'>{location.location}</p>
                                                <p className='text-xs text-slate-500 font-thin text-ellipsis line-clamp-1'>{location.address}</p>
                                            </div>
                                            {
                                                location === purchaseForm.location &&
                                                <FontAwesomeIcon icon={faCheck} width={15} className='text-blue-600' />
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Rate/Unit</label>
                            <input 
                            value={purchaseForm.rate}
                            onChange={(e) => {
                                setPurchaseForm({
                                    ...purchaseForm,
                                    rate: e.target.value
                                })
                            }}
                            type="number" 
                            className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
                        </div>
                    </div> */}

                    {/* <div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Quantity</label>
                            <input 
                            value={purchaseForm.qty}
                            onChange={(e) => {
                                setPurchaseForm({
                                    ...purchaseForm,
                                    qty: e.target.value
                                })
                            }}
                            type="number" 
                            className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
                        </div>
                    </div> */}

                    {/* <div> 
                        <div className='flex flex-col gap-1'>
                            <label className='text-xs'>Weight in MT</label>
                            <input 
                            value={purchaseForm.wightInMT}
                            onChange={(e) => {
                                setPurchaseForm({
                                    ...purchaseForm,
                                    wightInMT: e.target.value
                                })
                            }}
                            type="number" 
                            className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-black' />
                        </div>
                    </div> */}
                    <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Create Purchase</button>
                </form>
            </div>
        </div>
    )
}

export default PurchaseAdd