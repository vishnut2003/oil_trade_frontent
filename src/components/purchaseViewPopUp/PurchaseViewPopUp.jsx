import domainName from '@/domainName'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PurchaseViewPopUp = ({ locationId, purchase, children }) => {
    const server = domainName();
    const [locationDetails, setLocationDetails] = useState('')

    const [purchaseDeletedSuccess, setPurchaseDeletedSuccess] = useState('')

    const [convertToPurchasePopup, setConvertToPurchasePopup] = useState(false)

    // qty selection for convert to purchase invoice
    const [purchaseInvoiceQty, setPurchaseInvoiceQty] = useState({});
    const [purchaseInvoiceTotal, setPurchaseInvoiceTotal] = useState(0);
    const [invoiceCreateErr, setInvoiceCreateErr] = useState('');
    const [invoiceCreateSuccess, setInvoiceCreateSuccess] = useState('');

    useEffect(() => {
        axios.post(`${server}/purchase/location/get-one`, { locationId: purchase.location })
            .then((res) => {
                if (!res.data) {
                    setLocationDetails('')
                } else {
                    setLocationDetails(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

        // bargain purchase total
        axios.post(`${server}/total/bargain-purchase`, {bargainId: purchase._id})
            .then((res) => {
                setPurchaseInvoiceTotal(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [server, purchase])

    return (
        <div className='p-5 bg-white w-full max-w-xl rounded-md flex flex-col gap-3'>
            {children}
            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Bargain Date</b>
                    <p>{purchase.bargainDate.substring(0, 10).split('-').join('/')}</p>
                </div>
                <div className='text-sm text-right'>
                    <b>Created Date</b>
                    <p>{purchase.createdAt.substring(0, 10).split('-').join('/')}</p>
                </div>
            </div>
            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Bargain No.</b>
                    <p>{purchase.bargainNo}</p>
                </div>
                <div className='text-sm text-right'>
                    <b>Status</b>
                    {
                        purchase.status === 'pending' ?
                            <p className='text-red-500'>{purchase.status}</p> :
                            purchase.status === 'partial' ?
                                <p className='text-yellow-500'>{purchase.status}</p> :
                                <p className='text-green-500'>{purchase.status}</p>
                    }
                </div>
            </div>
            <div>
                <h2 className='text-base font-semibold'>Location</h2>
                {
                    locationDetails ?
                        <div className='text-sm'>
                            <b>{locationDetails.location}</b>
                            <p>{locationDetails.address}</p>
                        </div> :
                        <div>
                            <p className='text-sm font-semibold text-red-500'>Location is deleted!</p>
                        </div>
                }
            </div>

            <div className='shadow-md p-3 border border-slate-300 rounded-md max-h-60 overflow-auto'>
                <table className='w-full text-left'>
                    <thead>
                        <tr className='text-sm border-b border-slate-100'>
                            <th className='py-2 px-3'>
                                <h2 className='font-semibold'>Product Name</h2>
                            </th>
                            <th className='py-2 px-3'>
                                <p className='font-semibold'>Price</p>
                            </th>
                            <th className='py-2 px-3'>
                                <p className='font-semibold'>Qty</p>
                            </th>
                            <th className='py-2 px-3'>
                                <p className='font-semibold'>Weight In MT</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.products.map((product) => (
                            <tr className='text-sm font-medium border-b border-slate-100 hover:bg-blue-100' key={product.name}>
                                <td className='py-2 px-3'>{product.name}</td>
                                <td className='py-2 px-3'>{product.price}</td>
                                <td className='py-2 px-3'>{product.qty}</td>
                                <td className='py-2 px-3'>{product.weightInMT}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className='py-2 px-3'></td>
                            <td className='py-2 px-3'></td>
                            <td className='py-2 px-3 text-sm font-semibold'>Total</td>
                            <td className='py-2 px-3 text-sm font-semibold'>&#8377; {purchaseInvoiceTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center gap-3'>
                {
                    purchase.status !== 'complete' &&
                    <button
                        onClick={() => {
                            setConvertToPurchasePopup(true)
                        }}
                        className='text-sm font-semibold text-white bg-blue-500 py-2 px-4 rounded-md shadow-md shadow-blue-500'>
                        Convert to Purchase Invoice
                    </button>
                }
                <button
                    onClick={() => {
                        const confirm = window.confirm('Are you sure you want to delete this purchase?');
                        if (confirm) {
                            axios.post(`${server}/purchase/delete-one`, { purchaseId: purchase._id })
                                .then((res) => {
                                    setPurchaseDeletedSuccess(res.data)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    }}
                    className='bg-red-500 text-sm font-semibold text-white py-2 px-4 rounded-md shadow-md shadow-red-500'>Delete</button>
            </div>
            <div>
                {
                    purchaseDeletedSuccess &&
                    <div>
                        <p className='py-2 px-4 bg-green-200 text-green-600 text-sm font-semibold rounded-md'>{purchaseDeletedSuccess}</p>
                    </div>
                }
            </div>

            {/* Convert to Purchse Invoice */}
            {
                convertToPurchasePopup &&
                <div className='p-3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl rounded-md bg-white flex flex-col gap-3'>
                    <div className='flex flex-nowrap gap-2 justify-between'>
                        <h2 className='font-bold'>Enter Quantity</h2>
                        <button
                            onClick={() => {
                                setConvertToPurchasePopup(false)
                            }}
                            className='text-sm text-red-500'>close</button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            purchase.products.map((product) => (
                                <div className='flex justify-between items-center gap-3 text-sm'>
                                    <div>
                                        <p className='font-semibold'>{product.name}</p>
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            value={purchaseInvoiceQty[product._id]?.purchaseQty}
                                            onChange={(e) => {
                                                setPurchaseInvoiceQty({
                                                    ...purchaseInvoiceQty,
                                                    [product._id]: {
                                                        productId: product._id,
                                                        price: product.price,
                                                        purchaseQty: e.target.value,
                                                        name: product.name
                                                    }
                                                })
                                            }}
                                            className='w-20 outline-none border border-slate-300 rounded-md py-1 px-2' />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                const arrayOfProductQty = Object.values(purchaseInvoiceQty)
                                axios.post(`${server}/purchase/purchase-invoice/create`, { ...purchase, qtyPurchased: arrayOfProductQty })
                                    .then((res) => {
                                        setInvoiceCreateSuccess(res.data);
                                    })
                                    .catch((err) => {
                                        setInvoiceCreateErr(err.response.data);
                                    })
                            }}
                            className='py-1 w-full bg-blue-600 text-white rounded-md shadow-md shadow-blue-600 text-sm'>Create Purchase</button>
                    </div>

                    <div>
                        {
                            invoiceCreateErr &&
                            <p className='text-xs font-semibold py-2 px-3 bg-red-100 text-red-500 rounded-md'>{invoiceCreateErr}</p>
                        }
                        {
                            invoiceCreateSuccess &&
                            <p className='text-xs font-semibold py-2 px-3 bg-green-100 text-green-500 rounded-md'>{invoiceCreateSuccess}</p>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default PurchaseViewPopUp