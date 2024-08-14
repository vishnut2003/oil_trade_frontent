'use client';

import domainName from '@/domainName';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const salesBargainAdd = () => {

    const server = domainName();
    const [salesCreateLoading, setSalesCreateLoading] = useState(false);
    const [salesCreateSuccess, setSalesCreateSuccess] = useState('');
    const [salesCreateFailed, setSalesCreateFailed] = useState('');

    // products dropdown
    const [productPopup, setProductPopup] = useState(false);
    const [products, setProducts] = useState([])
    const [productSearch, setProductSearch] = useState('')

    // location dropdown
    const [locationPopup, setLocationPopup] = useState(false);
    const [locations, setLocations] = useState([])
    const [locationSearch, setLocationSearch] = useState('')

    const [salesBargainForm, setSalesBargainForm] = useState({
        location: '',
        products: [],
        bargainNo: `BRGNO/${new Date().toISOString().substring(0, 10).split('-').join('')}/${Math.floor(100000 + Math.random() * 900000)}`
    })

    useEffect(() => {
        axios.get(`${server}/sales/location/get-all`)
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
    }, [server])

    const submitSalesBargain = (e) => {
        e.preventDefault();
        console.log(salesBargainForm)
        // setPurchaseCreateLoading(true)
        // axios.post(`${server}/purchase/create-purchase`, salesBargainForm)
        //     .then((res) => {
        //         setPurchaseCreateLoading(false);
        //         setPurchaseCreateSuccess(res.data);
        //         setTimeout(() => setPurchaseCreateSuccess(''), 5000);
        //     })
        //     .catch((err) => {
        //         setPurchaseCreateLoading(false);
        //         setPurchaseCreateFailed(err.response.data);
        //         setTimeout(() => setPurchaseCreateFailed(''), 5000);
        //     })
    }

    return (
        <div className='flex justify-center md:justify-start'>
            <div className='w-full max-w-xl flex flex-col gap-4'>
                <h2>Add Sales Bargain</h2>
                <form className='w-full flex flex-col gap-2' onSubmit={submitSalesBargain}>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 w-1/2'>
                            <label className='text-xs'>Bargain Number</label>
                            <input
                                type="text"
                                value={salesBargainForm.bargainNo}
                                disabled
                                required
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
                                    salesBargainForm.products.length > 0 ?
                                        salesBargainForm.products.map((product) => (
                                            <span className='bg-slate-200 px-3 py-1 rounded-md' key={product._id}>
                                                {product.name}
                                                <FontAwesomeIcon
                                                    onClick={() => {
                                                        setSalesBargainForm(prevData => {
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
                                                salesBargainForm.products.map((salesProduct) => {
                                                    if (salesProduct._id === product._id) {
                                                        productExist = true
                                                    }
                                                })

                                                if (!productExist) {
                                                    const { name, _id, price } = product
                                                    const newProduct = {
                                                        name,
                                                        _id,
                                                        price: price,
                                                        qty: '',
                                                        weightInMT: ''
                                                    }
                                                    setSalesBargainForm({
                                                        ...salesBargainForm,
                                                        products: [...salesBargainForm.products, newProduct]
                                                    })
                                                }
                                            }}
                                            className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-sm font-semibold text-black'>{product.name}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {
                        salesBargainForm.products.length !== 0 &&
                        <div className='flex flex-col gap-2 border border-slate-200 p-3 rounded-md bg-white'>
                            {salesBargainForm.products.map((product) => (
                                <div className='flex flex-col md:flex-row flex-nowrap justify-between gap-2 md:items-center border-b border-slate-200 pb-2' key={product._id}>
                                    <p className='text-sm'>{product.name}</p>
                                    <div className='flex flex-nowrap gap-2'>
                                        <input
                                            type="number"
                                            required
                                            placeholder='Price'
                                            value={product.price}
                                            disabled
                                            className='max-w-24 w-full py-1 px-3 text-sm border border-slate-200 rounded-md bg-slate-100 text-slate-500'
                                        />

                                        <input
                                            type="number"
                                            required
                                            placeholder='qty'
                                            value={product.qty}
                                            onChange={(e) => {
                                                setSalesBargainForm(formData => {
                                                    let itemIndex;
                                                    formData.products.filter((filterProduct, index) => {
                                                        if (filterProduct._id === product._id) {
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
                                                setSalesBargainForm(formData => {
                                                    let itemIndex;
                                                    formData.products.filter((filterProduct, index) => {
                                                        if (filterProduct._id === product._id) {
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
                        <div className='relative'>
                            <label className='text-xs'>Location</label>
                            <div
                                onClick={() => {
                                    setLocationPopup(!locationPopup)
                                }}
                                className='p-3 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2' >
                                {
                                    salesBargainForm.location ?
                                        <p>{salesBargainForm.location.location}</p> :
                                        <p>Select Location</p>
                                }
                            </div>
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full shadow-md ${locationPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
                                <input
                                    type="text"
                                    value={locationSearch}
                                    onChange={(e) => {
                                        setLocationSearch(e.target.value)
                                    }}
                                    placeholder='Search Location'
                                    className='border border-slate-300 rounded-md w-full px-5 py-2 text-sm text-slate-500' />
                                <ul className='flex gap-1 flex-col'>
                                    {locations.filter((location) => {
                                        const search = locationSearch.toLocaleLowerCase()
                                        const locationName = location.location.toLocaleLowerCase()
                                        if (locationName.includes(search)) return location
                                    }).map((location, index) => (
                                        <li
                                            onClick={() => {
                                                setSalesBargainForm({
                                                    ...salesBargainForm,
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
                                                location === salesBargainForm.location &&
                                                <FontAwesomeIcon icon={faCheck} width={15} className='text-blue-600' />
                                            }
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md flex justify-center items-center gap-2'>
                        {
                            salesCreateLoading &&
                            <div className='w-4 h-4 rounded-full border border-b-0 border-r-0 animate-spin'></div>
                        }
                        Create Sales Bargain
                    </button>
                    {
                        salesCreateSuccess &&
                        <div className='py-2 px-4 rounded-md bg-green-200 border border-green-500'>
                            <p className='text-green-500 text-sm'>{salesCreateSuccess}</p>
                        </div>
                    }
                    {
                        salesCreateFailed &&
                        <div className='py-2 px-4 rounded-md bg-red-200 border border-red-500'>
                            <p className='text-red-500 text-sm'>{salesCreateFailed}</p>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default salesBargainAdd