'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useEffect, useState } from "react";

const SalesInvoiceViewPopup = ({ children, invoiceId }) => {
    const server = domainName();

    const [invoice, setInvoice] = useState({});
    const [invoiceDeleteSuccess, setInvoiceDeleteSuccess] = useState('');

    useEffect(() => {
        axios.post(`${server}/sales/invoice/get-one`, { invoiceId })
            .then((res) => {
                setInvoice(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [invoiceId, server])

    return (
        <div className="bg-white drop-shadow-lg p-3 flex flex-col gap-2">
            {children}
            <div>
                Popup content
            </div>
            <div className="flex flex-nowrap justify-between items gap-2">
                <div>
                    <button
                        onClick={() => {
                            axios.post(`${server}/sales/invoice/delete-one`, { invoiceId })
                                .then((res) => {
                                    setInvoiceDeleteSuccess(res.data);
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }}
                        className="text-sm bg-red-500 rounded-md py-2 px-3 shadow-md shadow-red-500 text-white">Delete</button>
                </div>
                <div>
                    <button className="text-sm bg-blue-500 rounded-md py-2 px-3 shadow-md shadow-blue-500 text-white">Print Invoice</button>
                </div>
                {
                    invoiceDeleteSuccess &&
                    <div className="text-sm text-left font-semibold bg-red-100 text-red-500 rounded-md">
                        <p>{invoiceDeleteSuccess}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default SalesInvoiceViewPopup
