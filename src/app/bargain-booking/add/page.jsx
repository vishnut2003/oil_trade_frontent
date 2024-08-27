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

    // Client dropdown
    const [clients, setClients] = useState([]);
    const [clientsPopup, setClientsPopup] = useState(false);
    const [clientSearch, setClientSearch] = useState('');

    // Seller dropdown
    const [sellerPopup, setSellerPopup] = useState(false);
    const [sellers, setSellers] = useState([]);
    const [sellerSearch, setSellerSearch] = useState('');

    const [salesBargainForm, setSalesBargainForm] = useState({
        location: {},
        products: [],
        bargainNo: `BRGNO/${new Date().toISOString().substring(0, 10).split('-').join('')}/${Math.floor(100000 + Math.random() * 900000)}`,
        client: {},
        discount: '0',
        validity: new Date().toISOString().substring(0, 10),
        bargainDate: new Date().toISOString().substring(0, 10),
        deliveryTerms: '',
        seller: {}
    })

    function salesCreateDataError(err) {
        setSalesCreateFailed(err);
        setTimeout(() => setSalesCreateFailed(''), 5000);
    }

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

        axios.get(`${server}/clients/get-all`)
            .then((res) => {
                setClients(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get(`${server}/users`)
            .then((res) => {
                setSellers(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [server])

    const submitSalesBargain = async (e) => {
        e.preventDefault();
        console.log(salesBargainForm)

        if(Object.keys(salesBargainForm.client).length === 0) {
            return salesCreateDataError('Buyer not selected!');
        }

        if(Object.keys(salesBargainForm.location).length === 0) {
            return salesCreateDataError('Location not selected!');
        }

        if(Object.keys(salesBargainForm.seller).length === 0) {
            return salesCreateDataError('Seller not selected!');
        }

        if(salesBargainForm.products.length === 0) {
            return salesCreateDataError('No products selected!');
        }

        setSalesCreateLoading(true)
        axios.post(`${server}/sales/bargain/create`, salesBargainForm)
            .then((res) => {
                setSalesCreateSuccess(res.data)
                setSalesCreateLoading(false);
                setTimeout(() => setSalesCreateSuccess(''), 5000);
            })
            .catch((err) => {
                salesCreateDataError(err.response.data);
                setSalesCreateLoading(false);
            })
    }

    function enterSalesBargainFormData(e) {
        setSalesBargainForm({
            ...salesBargainForm,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='flex justify-center md:justify-start pb-14'>
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
                        <div className='relative z-30'>
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
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full  shadow-md ${productPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
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
                        <div className='relative z-20'>
                            <label className='text-xs'>Location</label>
                            <div
                                onClick={() => {
                                    setLocationPopup(!locationPopup)
                                }}
                                className='p-3 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2' >
                                {
                                    salesBargainForm.location.location ?
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

                    <div>
                        <div className='relative z-10'>
                            <label className='text-xs'>Buyer</label>
                            <div
                                onClick={() => setClientsPopup(true)}
                                className='p-3 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2' >
                                {
                                    salesBargainForm.client.companyName ?
                                        <p>{salesBargainForm.client.companyName}</p> : <p>Selected item</p>
                                }
                            </div>
                            <div className={`bg-white max-h-52 overflow-auto scroll-smooth transition-all flex gap-3 flex-col absolute w-full shadow-md ${clientsPopup ? 'h-52 p-3 opacity-100' : 'h-0 opacity-0'}`}>
                                <input
                                    onChange={(e) => {
                                        setClientSearch(e.target.value);
                                    }}
                                    placeholder='Search Clients'
                                    className='border border-slate-300 rounded-md w-full px-5 py-2 text-sm text-slate-500' />
                                <ul className='flex gap-1 flex-col'>
                                    {clients.filter(client => {
                                        const clientName = client.companyName.toLowerCase();
                                        const searchClient = clientSearch.toLowerCase();
                                        if (!searchClient) return client;
                                        else {
                                            if (clientName.includes(searchClient)) {
                                                return client;
                                            }
                                        }
                                    }).map((client) => (
                                        <li
                                            onClick={() => {
                                                setSalesBargainForm({
                                                    ...salesBargainForm,
                                                    client: client
                                                });
                                                setClientsPopup(false);
                                            }}
                                            key={client._id}
                                            className='flex justify-between cursor-pointer px-3 py-2 rounded-md hover:bg-slate-100 items-center gap-2'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='text-sm text-slate-900 font-semibold'>{client.companyName}</p>
                                                <p className='text-xs text-slate-500 font-thin text-ellipsis line-clamp-1'>{client.clientCode}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 grow'>
                            <label className='text-xs'>Discount</label>
                            <input
                                className='p-2 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2'
                                type="number"
                                value={salesBargainForm.discount}
                                onChange={enterSalesBargainFormData}
                                name="discount"
                            />
                        </div>
                        <div className='flex flex-col gap-1 grow'>
                            <label className='text-xs'>Validity</label>
                            <input
                                value={salesBargainForm.validity}
                                onChange={enterSalesBargainFormData}
                                className='p-2 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2'
                                type="date"
                                name="validity"
                            />
                        </div>
                    </div>

                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 grow'>
                            <label className='text-xs'>Bargain Date</label>
                            <input
                            onChange={enterSalesBargainFormData}
                            value={salesBargainForm.bargainDate}
                                className='p-2 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2'
                                type="date"
                                name="bargainDate" />
                        </div>
                        <div className='flex flex-col gap-1 grow'>
                            <label className='text-xs'>Delivery Terms</label>
                            <select
                                required
                                value={salesBargainForm.deliveryTerms}
                                onChange={enterSalesBargainFormData}
                                className='p-2 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2'
                                name="deliveryTerms">
                                <option value="">- Select Options -</option>
                                <option value="FOR">FOR</option>
                                <option value="EXW">EXW</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className='relative z-0'>
                            <label className='text-xs'>Seller</label>
                            <div
                                onClick={() => setSellerPopup(!sellerPopup)}
                                className='p-3 rounded-sm text-sm border-b bg-white border-slate-300 text-slate-500 flex flex-wrap gap-2'>
                                    {
                                        salesBargainForm.seller.name ?  <p>{salesBargainForm.seller.name}</p> : <p>Select Seller</p>
                                    }
                               
                            </div>
                            <div className={`transition-all absolute top-16 left-0 bg-white rounded-md shadow-md w-full max-h-52 overflow-auto ${sellerPopup ? 'p-4 h-60' : 'p-0 h-0'}`}>
                                <div>
                                    <input
                                        value={sellerSearch}
                                        onChange={(e) => {
                                            setSellerSearch(e.target.value)
                                        }}
                                        className='text-xs bg-white py-2 px-3 rounded-md border border-slate-200 w-full'
                                        type="text"
                                        placeholder='Search Seller by Email' />
                                </div>
                                <div className='flex flex-col gap-2 pt-4'>
                                    {sellers.filter((seller) => {
                                        const searchText = sellerSearch.toLocaleLowerCase();
                                        const smallerEmail = seller.email.toLocaleLowerCase();
                                        if(smallerEmail.includes(searchText) || !searchText) {
                                            return seller;
                                        }
                                    }).map((seller) => (
                                        <div 
                                        onClick={() => {
                                            setSalesBargainForm({
                                                ...salesBargainForm,
                                                seller: seller
                                            })
                                            setSellerPopup(false);
                                        }}
                                        key={seller._id} 
                                        className='flex justify-between items-center'>
                                            <div className='w-max'>
                                                <p className='text-sm font-semibold'>{seller.name}</p>
                                                <p className='text-xs'>{seller.email}</p>
                                            </div>
                                            <div>
                                                {
                                                    salesBargainForm.seller._id === seller._id && <FontAwesomeIcon icon={faCheck} width={'20px'} className='text-blue-500' />
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
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