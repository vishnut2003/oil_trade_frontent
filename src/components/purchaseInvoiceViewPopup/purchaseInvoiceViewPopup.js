import domainName from '@/domainName'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PurchaseInvoiceViewPopup = ({ purchase, children }) => {
    const server = domainName();
    const [locationDetails, setLocationDetails] = useState('')

    const [purchaseDeletedSuccess, setPurchaseDeletedSuccess] = useState('')

    useEffect(() => {
        axios.post(`${server}/purchase/location/get-one`, { locationId: purchase.locationId })
            .then((res) => {
                console.log(res)
                if (!res.data) {
                    setLocationDetails('')
                } else {
                    setLocationDetails(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [server, purchase])

    function deleteOnePurchaseInvoice() {
        return new Promise((resolve, reject) => {
            axios.post(`${server}/purchase/purchase-invoice/delete-one`, { purchaseInvoiceId: purchase._id })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        })
    }

    return (
        <div className='p-5 bg-white w-full max-w-xl rounded-md flex flex-col gap-3'>
            {children}
            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Invoice No.</b>
                    <p>{purchase.invoiceNo}</p>
                </div>
                <div className='text-sm text-right'>
                    <b>Invoice Date</b>
                    <p>{purchase.createdAt.substring(0, 10).split('-').join('/')}</p>
                </div>
            </div>
            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Bargain No.</b>
                    <p>{purchase.againstBargainNo}</p>
                </div>
                <div className='text-sm text-right'>
                    <b>Last Updated</b>
                    <p>{purchase.updatedAt.substring(0, 10).split('-').join('/')}</p>
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
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.products.map((product) => (
                            <tr className='text-sm font-medium border-b border-slate-100 hover:bg-blue-100' key={product.name}>
                                <td className='py-2 px-3'>{product.name}</td>
                                <td className='py-2 px-3'>{product.price}</td>
                                <td className='py-2 px-3'>{product.purchaseQty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center gap-3'>
                <button
                    onClick={() => {
                        const confirm = window.confirm('Are you sure you want to delete this Purchase Invoice?')
                        if (confirm) {
                            deleteOnePurchaseInvoice()
                                .then((res) => {
                                    setPurchaseDeletedSuccess(res)
                                })
                        }
                    }}
                    className='bg-red-500 text-sm font-semibold text-white py-2 px-4 rounded-md shadow-md shadow-red-500'>Delete</button>
                <button className='bg-blue-500 text-sm font-semibold text-white py-2 px-4 rounded-md shadow-md shadow-blue-500'>Print Invoice</button>
            </div>
            <div>
                {
                    purchaseDeletedSuccess &&
                    <div>
                        <p className='py-2 px-4 bg-green-200 text-green-600 text-sm font-semibold rounded-md'>{purchaseDeletedSuccess}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default PurchaseInvoiceViewPopup