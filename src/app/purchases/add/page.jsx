'use client';

import domainName from '@/domainName';
import { faAngleUp, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PurchaseAdd = () => {

    const server = domainName();
    const [purchaseCreateLoading, setPurchaseCreateLoading] = useState(false);
    const [purchaseCreateSuccess, setPurchaseCreateSuccess] = useState('');
    const [purchaseCreateFailed, setPurchaseCreateFailed] = useState('')

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
    }, [server])

    const submitPurchase = (e) => {
        e.preventDefault();
        setPurchaseCreateLoading(true)
        axios.post(`${server}/purchase/create-purchase`, purchaseForm)
            .then((res) => {
                setPurchaseCreateLoading(false);
                setPurchaseCreateSuccess(res.data);
                setTimeout(() => setPurchaseCreateSuccess(''), 5000);
            })
            .catch((err) => {
                setPurchaseCreateLoading(false);
                setPurchaseCreateFailed(err.response.data);
                setTimeout(() => setPurchaseCreateFailed(''), 5000);
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
                                className='px-3 py-2 bg-white rounded-md text-sm border-2 border-blue-500 text-slate-500' />
                        </div>
                        <div className='flex flex-col gap-1 w-1/2'>
                            <label className='text-xs'>Current Date</label>
                            <input type="date" required disabled className='px-3 py-2 rounded-md text-sm bg-slate-200 text-slate-500' value={new Date().toISOString().substring(0, 10)} />
                        </div>
                    </div>
                    <div>
                        <div className='relative'>
                            <label className='text-xs'>Products</label>
                            <div className='px-3 py-2 rounded-md text-sm border-2 bg-white border-blue-500 text-slate-500 flex flex-wrap gap-2 justify-between items-center' >
                                <div className='flex flex-wrap gap-1'>
                                    {
                                        purchaseForm.products.length > 0 ?
                                            purchaseForm.products.map((product) => (
                                                <span className='bg-blue-500 text-white px-3 py-1 rounded-md' key={product._id}>
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
                                                        className='text-white ml-2 cursor-pointer'
                                                        width={10}
                                                        icon={faXmark} />
                                                </span>
                                            )) :
                                            <span className='rounded-md'>
                                                Select products
                                            </span>
                                    }
                                </div>
                                    <div>
                                        <FontAwesomeIcon 
                                        onClick={() => {
                                            setProductPopup(!productPopup)
                                        }}
                                        icon={faAngleUp} width={'20px'} 
                                        className={`cursor-pointer text-blue-500 ${productPopup ? 'rotate-0' : 'rotate-180'}`} />
                                    </div>
                            </div>
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full  shadow-md z-10 ${productPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
                                <input
                                    type="text"
                                    value={productSearch}
                                    onChange={(e) => {
                                        setProductSearch(e.target.value)
                                    }}
                                    placeholder='Search product'
                                    className='border-2 border-slate-300 rounded-md w-full px-5 py-2 text-sm text-slate-500' />
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
                                                    if (purchaseProduct._id === product._id) {
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
                                            {
                                                purchaseForm.products.map((purchaseProduct) => {
                                                    if (purchaseProduct._id === product._id) {
                                                        return (
                                                            <FontAwesomeIcon icon={faCheck} width={15} className='text-blue-600' />
                                                        )
                                                    }
                                                })
                                            }
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
                                <div className='flex flex-col md:flex-row flex-nowrap justify-between gap-2 md:items-center border-b border-blue-300 pb-3' key={product._id}>
                                    <p className='text-base font-extrabold capitalize'>{product.name}</p>
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
                                                        if (filterProduct._id === product._id) {
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
                                            className='max-w-24 w-full py-2 px-3 text-sm border-2 border-blue-500 rounded-md'
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
                                            className='max-w-24 w-full py-1 px-3 text-sm border-2 border-blue-500 rounded-md'
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
                                            className='max-w-24 w-full py-1 px-3 text-sm border-2 border-blue-500 rounded-md'
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
                                className='px-5 py-2 rounded-md text-sm border-2 border-blue-500 text-black' />
                        </div>
                    </div>
                    <div>
                        <div className='relative'>
                            <label className='text-xs'>Location</label>
                            <div className='py-2 px-3 rounded-md text-sm border-2 bg-white border-blue-500 text-slate-500 flex flex-wrap gap-2 justify-between items-center' >
                                {
                                    purchaseForm.location ?
                                        <p>{purchaseForm.location.location}</p> :
                                        <p>Select Location</p>
                                }
                                <FontAwesomeIcon
                                onClick={() => {
                                    setLocationPopup(!locationPopup)
                                }}
                                icon={faAngleUp} width={'20px'} className={`text-blue-500 cursor-pointer ${ locationPopup ? 'rotate-0' : 'rotate-180'}`}/>
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
                    
                    <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md flex justify-center items-center gap-2'>
                        {
                            purchaseCreateLoading &&
                            <div className='w-4 h-4 rounded-full border border-b-0 border-r-0 animate-spin'></div>
                        }
                        Create Purchase
                    </button>
                    {
                        purchaseCreateSuccess &&
                        <div className='py-2 px-4 rounded-md bg-green-200 border border-green-500'>
                            <p className='text-green-500 text-sm'>{purchaseCreateSuccess}</p>
                        </div>
                    }
                    {
                        purchaseCreateFailed &&
                        <div className='py-2 px-4 rounded-md bg-red-200 border border-red-500'>
                            <p className='text-red-500 text-sm'>{purchaseCreateFailed}</p>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default PurchaseAdd