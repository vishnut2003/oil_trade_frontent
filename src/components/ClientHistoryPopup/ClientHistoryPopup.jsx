'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useEffect, useState } from "react";
import BargainSalesViewPopup from "../BargainSalesViewPopup/BargainSalesViewPopup";
import SalesInvoiceViewPopup from "../SalesInvoiceViewPopup/SalesInvoiceViewPopup";

const ClientHistoryPopup = ({ children, clientId }) => {

  const server = domainName();

  const [bargainHistories, setBargainHistory] = useState([]);
  const [invoiceHistories, setInvoiceHistories] = useState([]);
  const [type, setType] = useState('bargain');

  const [bargainSearch, setBargainSearch] = useState('');
  const [bargainViewPopup, setBargainViewPopup] = useState({});

  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceViewPopup, setInvoiceViewPopup] = useState({});

  useEffect(() => {
    axios.post(`${server}/clients/bargain-history`, { clientId })
      .then((res) => {
        setBargainHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

    axios.post(`${server}/clients/invoice-history`, { clientId })
      .then((res) => {
        setInvoiceHistories(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [clientId])

  return (
    <div className="bg-white drop-shadow-xl p-4 flex flex-col gap-2">
      {children}
      <div className="flex flex-col gap-3">
        <div>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value)
            }}
            name="type" className="text-sm bg-blue-500 text-white rounded-md py-2 px-3 outline-none">
            <option value="bargain">Bargain</option>
            <option value="invoice">Invoice</option>
          </select>
        </div>
        <div className="max-h-80 overflow-auto">
          {/* Bargains table */}
          {
            type === 'bargain' &&
            <div className="flex flex-col gap-2 items-end">
              {/* Bargain search option */}
              <div>
                <input
                  value={bargainSearch}
                  onChange={(e) => setBargainSearch(e.target.value)}
                  type="text"
                  className="text-sm border-2 border-blue-600 py-2 px-3 rounded-md"
                  placeholder="Search Bargain No." />
              </div>
              <table className="text-left">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="text-sm py-2 px-3">Bargain Date</th>
                    <th className="text-sm py-2 px-3">Bargain No.</th>
                    <th className="text-sm py-2 px-3">Seller</th>
                    <th className="text-sm py-2 px-3">Status</th>
                    <th className="text-sm py-2 px-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bargainHistories.filter((history) => {
                    const search = bargainSearch.toLocaleLowerCase();
                    const bargainNo = history.bargainNo.toLocaleLowerCase();

                    if (bargainNo.includes(search)) {
                      return history;
                    }

                  }).map((history) => (
                    <tr className="hover:bg-blue-100">
                      <td className="text-sm py-2 px-3">{history.bargainDate.substring(0, 10).split('-').join('/')}</td>
                      <td className="text-sm py-2 px-3">{history.bargainNo}</td>
                      <td className="text-sm py-2 px-3">{history.seller?.username}</td>
                      <td className="text-sm py-2 px-3">
                        {
                          history.status === 'pending' &&
                          <span className="text-sm font-semibold text-red-600 bg-red-200 py-2 px-3 rounded-md">Pending</span>
                        }
                        {
                          history.status === 'partial' &&
                          <span className="text-sm font-semibold text-yellow-600 bg-yellow-200 py-2 px-3 rounded-md">Pending</span>
                        }
                        {
                          history.status === 'complete' &&
                          <span className="text-sm font-semibold text-green-600 bg-green-200 py-2 px-3 rounded-md">Pending</span>
                        }
                      </td>
                      <td className="text-sm py-2 px-3">
                        <button
                          onClick={() => setBargainViewPopup({
                            ...bargainViewPopup,
                            [history._id]: true
                          })}
                          className="bg-blue-600 rounded-md py-2 px-3 text-white shadow-md shadow-blue-500">View</button>
                        {
                          // sales bargains popup
                          bargainViewPopup[history._id] &&
                          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                            <div className='p-2 drop-shadow-2xl bg-white rounded-md'>
                              <BargainSalesViewPopup salesBargainId={history._id}>
                                <div className='flex flex-nowrap gap-2 justify-between border-b border-slate-100 pb-3'>
                                  <div>
                                    <h2 className='text-base font-semibold'>Sales Bargain Details</h2>
                                  </div>
                                  <div>
                                    <p
                                      onClick={() => {
                                        setBargainViewPopup({
                                          ...bargainViewPopup,
                                          [history._id]: false
                                        })
                                      }}
                                      className='text-sm text-red-500 font-semibold cursor-pointer'>Close</p>
                                  </div>
                                </div>
                              </BargainSalesViewPopup>
                            </div>
                          </div>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

          {/* Invoice table */}
          {
            type === 'invoice' &&
            <div className="flex flex-col items-end gap-2">
              <div>
                <input
                  value={invoiceSearch}
                  onChange={(e) => setInvoiceSearch(e.target.value)}
                  className="text-sm border-2 border-blue-600 py-2 px-3 rounded-md"
                  type="text"
                  text-sm border-2 border-blue-600 py-2 px-3 rounded-md
                  placeholder="Search Invoice No." />
              </div>
              <table className="text-left">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th className="text-sm py-2 px-3">Invoice Date</th>
                    <th className="text-sm py-2 px-3">Invoice No.</th>
                    <th className="text-sm py-2 px-3">Bargain No</th>
                    <th className="text-sm py-2 px-3">Seller</th>
                    <th className="text-sm py-2 px-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceHistories.filter((history) => {
                    const search = invoiceSearch.toLocaleLowerCase();
                    const invoiceNo = history.invoiceNo.toLocaleLowerCase();

                    if (invoiceNo.includes(search)) {
                      return history;
                    }
                  }).map((history) => (
                    <tr className="hover:bg-blue-100">
                      <td className="text-sm py-2 px-3">{history.invoiceDate.substring(0, 10).split('-').join('/')}</td>
                      <td className="text-sm py-2 px-3">{history.invoiceNo}</td>
                      <td className="text-sm py-2 px-3">{history.bargainNo}</td>
                      <td className="text-sm py-2 px-3">{history.seller?.username}</td>
                      <td className="text-sm py-2 px-3">
                        <button 
                        onClick={() => setInvoiceViewPopup({
                          ...invoiceViewPopup,
                          [history._id]: true
                        })}
                        className="bg-blue-600 rounded-md py-2 px-3 text-white shadow-md shadow-blue-500">View</button>
                        {
                          // Invoice view popup
                          invoiceViewPopup[history._id] &&
                          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                            <SalesInvoiceViewPopup invoiceId={history._id}>
                              <div className='flex flex-nowrap justify-between items-center gap-3'>
                                <h2 className='text-base font-semibold'>Sales Invoice</h2>
                                <p
                                  onClick={() => {
                                    setInvoiceViewPopup({
                                      ...invoiceViewPopup,
                                      [history._id]: false
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
          }
        </div>
      </div>
    </div>
  )
}

export default ClientHistoryPopup
