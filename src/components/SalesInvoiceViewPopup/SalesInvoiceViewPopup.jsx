'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useEffect, useState } from "react";

const SalesInvoiceViewPopup = ({ children, invoiceId }) => {
    const server = domainName();

    const [invoice, setInvoice] = useState({});
    const [invoiceTotal, setInvoiceTotal] = useState(0);
    const [invoiceDeleteSuccess, setInvoiceDeleteSuccess] = useState('');

    useEffect(() => {
        axios.post(`${server}/sales/invoice/get-one`, { invoiceId })
            .then((res) => {
                setInvoice(res.data);
            })
            .catch((err) => {
                console.log(err);
            })

        // calculate invoice total
        axios.post(`${server}/total/sales-invoice`, {invoiceId})
            .then((res) => {
                setInvoiceTotal(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [invoiceId, server])

    return (
        <div className="bg-white drop-shadow-2xl max-h-svh rounded-md p-4 flex flex-col gap-3">
            {children}
            <div className="flex flex-col gap-3">
                <div className="text-sm flex flex-nowrap justify-between gap-4">
                    <div>
                        <b>Invoice No.</b>
                        <p>{invoice.invoiceNo}</p>
                    </div>
                    <div className="text-right">
                        <b>Invoice Date</b>
                        <p>{invoice.invoiceDate?.substring(0, 10).split('-').join('/')}</p>
                    </div>
                </div>
                <div className="text-sm flex flex-nowrap justify-between gap-4">
                    <div>
                        <b>Bargain No.</b>
                        <p>{invoice.bargainNo}</p>
                    </div>
                    <div className="text-right">
                        <b>Last Updated</b>
                        <p>{invoice.updatedAt?.substring(0, 10).split('-').join('/')}</p>
                    </div>
                </div>
                <div className="text-sm flex flex-nowrap justify-between gap-4">
                    <div>
                        <b>Client Name</b>
                        <p>{invoice.client?.clientName}</p>
                    </div>
                    <div className="text-right">
                        <b>Client Code</b>
                        <p>{invoice.client?.clientCode}</p>
                    </div>
                </div>
                <div className="text-sm flex flex-nowrap justify-between gap-4">
                    <div>
                        <b>Location</b>
                        <p>{invoice.location?.location}</p>
                        <p>{invoice.location?.address}</p>
                    </div>
                </div>
                <div className="text-sm flex flex-nowrap justify-between gap-4">
                    <div>
                        <b>Supplier</b>
                        <p>{invoice.seller?.username}</p>
                    </div>
                    <div className="text-right">
                        <b>Delivery Terms</b>
                        <p>{invoice.deliveryTerms}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 justify-stretch">
                    <h2 className="text-sm font-semibold">Products</h2>
                    <table className="border border-slate-400 text-left">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Price</th>
                                <th className="py-2 px-4">Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoice.products?.map((product) => (
                                    <tr>
                                        <td className="py-2 px-3">{product.name}</td>
                                        <td className="py-2 px-3">{product.price}</td>
                                        <td className="py-2 px-3">{product.qty}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td className="py-2 px-3"></td>
                                <td className="py-2 px-3 font-semibold">Discount</td>
                                <td className="py-2 px-3 font-semibold">{invoice.discount}</td>
                            </tr>
                            <tr>
                                <td className="py-2 px-3"></td>
                                <td className="py-2 px-3 font-semibold">Total</td>
                                <td className="py-2 px-3 font-semibold">{invoiceTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-nowrap justify-between items gap-2">
                <div>
                    <button
                        onClick={() => {
                            const confirm = window.confirm('Are you suure you want to delete this sales invoice?')
                            if (confirm) {
                                axios.post(`${server}/sales/invoice/delete-one`, { invoiceId })
                                    .then((res) => {
                                        setInvoiceDeleteSuccess(res.data);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    })
                            } else {
                                return;
                            }
                        }}
                        className="text-sm bg-red-500 rounded-md py-2 px-3 shadow-md shadow-red-500 text-white">Delete</button>
                </div>
                <div>
                    <button className="text-sm bg-blue-500 rounded-md py-2 px-3 shadow-md shadow-blue-500 text-white">Print Invoice</button>
                </div>
            </div>
            <div>
                {
                    invoiceDeleteSuccess &&
                    <div className="text-sm text-left font-semibold bg-red-100 text-red-500 rounded-md py-2 px-4
                    ">
                        <p>{invoiceDeleteSuccess}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default SalesInvoiceViewPopup
