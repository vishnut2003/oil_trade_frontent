import domainName from '@/domainName'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const BargainSalesViewPopup = ({ children, salesBargainId }) => {

    const server = domainName();
    const [salesBargain, setSalesBargain] = useState({});
    const [bargainDeleteSuccess, setBargainDeleteSuccess] = useState('');
    const [qtyPopup, setQtyPopup] = useState(false);

    useEffect(() => {
        axios.post(`${server}/sales/bargain/get-one`, { salesBargainId })
            .then((res) => {
                setSalesBargain(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [salesBargainId, server])

    return (
        <div className='p-5 bg-white w-full max-w-xl rounded-md flex flex-col gap-3 min-w-96'>
            {children}
            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Bargain Date</b>
                    <p>{salesBargain.bargainDate?.substring(0, 10).split('-').join('/')}</p>
                </div>
                <div className='text-sm text-right'>
                    <b>Bargain No.</b>
                    <p>{salesBargain.bargainNo}</p>
                </div>

            </div>
            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Created At</b>
                    <p>{salesBargain.createdAt?.substring(0, 10).split('-').join('/')}</p>
                </div>
                <div className='text-sm text-right'>
                    <b>Seller</b>
                    <p>{salesBargain.seller?.username}</p>
                </div>
            </div>
            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Buyer</b>
                    <p>{salesBargain.client?.companyName}</p>
                    <p>{salesBargain.client?.clientCode}</p>
                </div>
                <div className='text-sm text-right'>
                    <b>Delivery Terms</b>
                    <p>{salesBargain.deliveryTerms}</p>
                </div>
            </div>
            <div>
                <h2 className='text-base font-semibold'>Location</h2>
                <div className='text-sm'>
                    <b className='text-xs'>{salesBargain.location?.location}</b>
                    <p>{salesBargain.location?.address}</p>
                </div>
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
                        {salesBargain.products?.map((product) => (
                            <tr className='text-sm font-medium border-b border-slate-100 hover:bg-blue-100' key={product._id}>
                                <td className='py-2 px-3'>{product.name}</td>
                                <td className='py-2 px-3'>{product.price}</td>
                                <td className='py-2 px-3'>{product.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='flex flex-nowrap justify-between'>
                <div className='text-sm'>
                    <b>Discount</b>
                    {
                        salesBargain.discount && <p className='font-semibold text-left'>{salesBargain.discount} &#8377;</p>
                    }
                </div>
                <div className='text-sm text-right'>
                    <b>Status</b>
                    {
                        salesBargain.status === 'pending' && <p className='text-sm text-red-500 font-semibold'>{salesBargain.status}</p>
                    }
                    {
                        salesBargain.status === 'partial' && <p className='text-sm text-yellow-500 font-semibold'>{salesBargain.status}</p>
                    }
                    {
                        salesBargain.status === 'complete' && <p className='text-sm text-green-500 font-semibold'>{salesBargain.status}</p>
                    }

                </div>
            </div>

            <div className='flex flex-col md:flex-row justify-between items-center gap-3'>
                <button
                    onClick={() => {
                        const confirm = window.confirm('Are you sure you want to delete this bargain?');

                        if (confirm) {
                            axios.post(`${server}/sales/bargain/delete-one`, { bargainId: salesBargain._id })
                                .then((res) => {
                                    setBargainDeleteSuccess(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                    }}
                    className='bg-red-500 text-sm font-semibold text-white py-2 px-4 rounded-md shadow-md shadow-red-500'>Delete</button>
                <button
                    onClick={() => {
                        setQtyPopup(true)
                    }}
                    className='text-sm font-semibold text-blue-500'>Convert to Invoice</button>
            </div>

            {
                qtyPopup &&
                <div className='w-max fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md drop-shadow-2xl p-3 flex flex-col gap-2 border border-slate-200'>
                    <div className='flex flex-nowrap justify-center items-center gap-4'>
                        <h2 className='text-base font-semibold'>Enter Quantity</h2>
                        <p
                            onClick={() => setQtyPopup(false)}
                            className='text-sm text-red-600 font-semibold cursor-pointer'>Close</p>
                    </div>
                    <div className='flex flex-col gap-2'>

                        {salesBargain.products?.map((product, index) => (
                            <div className='flex flex-nowrap gap-2 justify-between items-center'>
                                <div className='text-sm font-semibold text-left'>{product.name}</div>
                                <div><input
                                    type="number"
                                    name={product._id}
                                    value={product.qty}
                                    onChange={(e) => {
                                        const newBargain = { ...salesBargain };
                                        newBargain.products[index].qty = e.target.value;
                                        setSalesBargain(newBargain);
                                    }}
                                    className='w-14 border border-slate-300 rounded-md' /></div>
                            </div>
                        ))}

                        <button 
                        onClick={() => {
                            const {_id, createdAt, updatedAt, validity, status, bargainDate, ...salesEntry} = salesBargain;
                            axios.post(`${server}/sales/invoice/create`, salesEntry)
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }}
                        className='text-sm font-semibold bg-blue-500 text-white rounded-md shadow-md shadow-blue-500 p-1 w-full'>Create Invoice</button>
                    </div>
                </div>
            }

            <div>
                {
                    bargainDeleteSuccess &&
                    <div>
                        <p className='py-2 px-4 bg-green-200 text-green-600 text-sm font-semibold rounded-md'>{bargainDeleteSuccess}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default BargainSalesViewPopup