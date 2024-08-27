'use client';

import SalesInvoiceViewPopup from '@/components/SalesInvoiceViewPopup/SalesInvoiceViewPopup';
import domainName from '@/domainName';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Sales = () => {

  const [salesInvoices, setSalesInvoices] = useState([]);
  const [invoicePopup, setInvoicePopup] = useState({});

  const server = domainName();
  useEffect(() => {
    axios.get(`${server}/sales/invoice/get-all`)
      .then((res) => {
        setSalesInvoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [server])

  return (
    <div>
      <div className='flex flex-col gap-3 max-w-max'>
        <h2 className='text-base font-bold'>Sales Invoices</h2>
        <table className='text-sm bg-white shadow-md rounded-md'>
          <thead>
            <tr>
              <th className='py-3 px-4 text-left'>Invoice Date</th>
              <th className='py-3 px-4 text-left'>Invoice No.</th>
              <th className='py-3 px-4 text-left'>Bargain No.</th>
              <th className='py-3 px-4 text-left'>Last Updated</th>
              <th className='py-3 px-4 text-left'></th>
            </tr>
          </thead>
          <tbody>
            {salesInvoices.map((invoice) => (
              <tr>
                <td className='py-3 px-4 text-left'>{invoice.invoiceDate?.substring(0, 10).split('-').join('/')}</td>
                <td className='py-3 px-4 text-left'>{invoice.invoiceNo}</td>
                <td className='py-3 px-4 text-left'>{invoice.bargainNo}</td>
                <td className='py-3 px-4 text-left'>{invoice.updatedAt?.substring(0, 10).split('-').join('/')}</td>
                <td className='py-3 px-4 text-left'>
                  <FontAwesomeIcon
                    onClick={() => {
                      setInvoicePopup({
                        ...invoicePopup,
                        [invoice._id]: true
                      })
                    }}
                    icon={faAngleDown}
                    width={'20px'} className='text-blue-500 cursor-pointer' />
                  {
                    invoicePopup[invoice._id] &&
                    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                      <SalesInvoiceViewPopup invoiceId={invoice._id}>
                        <div className='flex flex-nowrap justify-between items-center gap-3'>
                          <h2 className='text-base font-semibold'>Sales Invoice</h2>
                          <p
                            onClick={() => {
                              setInvoicePopup({
                                ...invoicePopup,
                                [invoice._id]: false
                              })
                              axios.get(`${server}/sales/invoice/get-all`)
                                .then((res) => {
                                  setSalesInvoices(res.data);
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                            }}
                            className='text-sm font-semibold text-red-500 cursor-pointer'>Close</p>
                        </div>
                      </SalesInvoiceViewPopup>
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Sales