'use client';

import AddLocation from '@/components/AddPurchaseLocation/AddPurchaseLocation';
import PurchaseInvoiceViewPopup from '@/components/purchaseInvoiceViewPopup/purchaseInvoiceViewPopup';
import PurchaseViewPopUp from '@/components/purchaseViewPopUp/PurchaseViewPopUp';
import domainName from '@/domainName';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Purchase = () => {

  const [addLocation, setAddLocation] = useState(false);
  const server = domainName();

  const [purchases, setPurchases] = useState([]);
  const [purchaseEdit, setPurchaseEdit] = useState({});
  const [purchaseSearch, setPurchaseSearch] = useState({
    bargainDate: '',
    bargainNo: '',
    createdAt: '',
    status: ''
  })

  const [locations, setLocations] = useState([]);
  const [locationSearch, setLocationSearch] = useState('')
  const [locationEdit, setLocationEdit] = useState({});
  const [locationChanges, setLocationChanges] = useState({})
  const [locationChangesErr, setLocationChangesErr] = useState('')
  const [locationChangesSuccess, setLocationChangesSuccess] = useState('')

  const [purchaseInvoiceEntries, setPurchaseInvoiceEntries] = useState([])
  const [purchaseInvoicePopup, setPurchaseInvoicePopup] = useState({})

  useEffect(() => {

    axios.get(`${server}/purchase/get-all`)
      .then((res) => {
        setPurchases(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

    axios.get(`${server}/purchase/location/get-all`)
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err)
      })

    axios.get(`${server}/purchase/purchase-invoice/get-all`).then(async(res) => {
      setPurchaseInvoiceEntries(res.data)
    })
      .catch((err) => {
        console.log(err)
      })

  }, [])

  function getAllPurchase() {
    return new Promise((resolve, reject) => {
      axios.get(`${server}/purchase/get-all`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  function getAllLocation() {
    return new Promise((resolve, reject) => {
      axios.get(`${server}/purchase/location/get-all`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }

  function getAllPurchaseInvoice() {
    return new Promise((resolve, reject) => {
      axios.get(`${server}/purchase/purchase-invoice/get-all`)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

  return (
    <div className='flex flex-col gap-4 mb-6'>
      <h2 className="text-lg font-bold">Purchase</h2>
      <div className='flex gap-3'>
        <Link href={'/purchases/add'}>
          <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Bargain Purchase</button>
        </Link>
      </div>

      {/* Purchase Entries table */}
      <div className='w-full md:max-w-screen-md flex flex-col md:flex-row justify-between items-end gap-2'>
        <div>
          <p className='text-sm font-medium text-slate-400 mb-1'>Bargain Date</p>
          <input
            type="date"
            value={purchaseSearch.bargainDate}
            onChange={(e) => {
              setPurchaseSearch({
                ...purchaseSearch,
                bargainDate: e.target.value
              })
            }}
            className='text-sm font-medium py-2 px-4 rounded-md shadow-sm'
            placeholder='Bargain Date' />
        </div>
        <div>
          <p className='text-sm font-medium text-slate-400 mb-1'>Bargain No.</p>
          <input
            type="text"
            value={purchaseSearch.bargainNo}
            onChange={(e) => {
              setPurchaseSearch({
                ...purchaseSearch,
                bargainNo: e.target.value
              })
            }}
            className='text-sm font-medium py-2 px-4 rounded-md shadow-sm'
            placeholder='Bargain No.'
          />
        </div>
        <div>
          <p className='text-sm font-medium text-slate-400 mb-1'>Created Date</p>
          <input
            type="Date"
            value={purchaseSearch.createdAt}
            onChange={(e) => {
              setPurchaseSearch({
                ...purchaseSearch,
                createdAt: e.target.value
              })
            }}
            className='text-sm font-medium py-2 px-4 rounded-md shadow-sm'
          />
        </div>
        <div>
          <p className='text-sm font-medium text-slate-400 mb-1'>Select Status</p>
          <select
            value={purchaseSearch.status}
            onChange={(e) => {
              setPurchaseSearch({
                ...purchaseSearch,
                status: e.target.value
              })
            }}
            className='text-sm font-medium py-2 px-4 rounded-md shadow-sm'>
            <option value="">- Select Status -</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="complete">Complete</option>
          </select>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setPurchaseSearch({
              bargainDate: '',
              bargainNo: '',
              createdAt: '',
              status: ''
            })
          }}
          className='text-sm bg-red-600 text-white rounded-md shadow-md shadow-red-500 py-2 px-3'>Reset Filter</button>
      </div>
      <div className='bg-white p-2 w-full md:max-w-screen-md rounded-md shadow-md shadow-slate-200'>
        <table className='w-full'>
          <thead className='border-b border-slate-100 hidden sm:table-header-group'>
            <tr>
              <th className='py-2 px-4 text-left'>Bargain Date</th>
              <th className='py-2 px-4 text-left'>Bargain No.</th>
              <th className='py-2 px-4 text-left'>Created Date</th>
              <th className='py-2 px-4 text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              purchases.length > 0 ?
                purchases.filter((purchase) => {
                  if (!purchaseSearch.bargainDate && !purchaseSearch.bargainNo && !purchaseSearch.createdAt && !purchaseSearch.status) {
                    return purchase;
                  } else {
                    if (
                      purchase.bargainDate.substring(0, 10) === purchaseSearch.bargainDate ||
                      purchase.bargainNo === purchaseSearch.bargainNo ||
                      purchase.createdAt.substring(0, 10) === purchaseSearch.createdAt ||
                      purchase.status === purchaseSearch.status
                    ) {
                      return purchase;
                    }
                  }
                }).map((purchase) => (
                  <React.Fragment key={purchase._id}>
                    <tr className='border-b border-slate-100'>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Bargain Date</b>
                        {purchase.bargainDate.substring(0, 10).split('-').join('/')}
                      </td>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Bargain No.</b>
                        {purchase.bargainNo}
                      </td>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Created Date</b>
                        {purchase.createdAt.substring(0, 10).split('-').join('/')}
                      </td>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Status</b>
                        {
                          purchase.status === 'pending' &&
                          <p className='py-1 px-3 bg-red-200 text-red-600 rounded-md w-max font-semibold'>Pending</p>
                        }
                        {
                          purchase.status === 'complete' &&
                          <p className='py-1 px-3 bg-green-200 text-green-600 rounded-md w-max font-semibold'>Complete</p>
                        }
                        {
                          purchase.status === 'partial' &&
                          <p className='py-1 px-3 bg-yellow-50 text-yellow-500 rounded-md w-max font-semibold'>Partial</p>
                        }
                      </td>
                      <td className='py-2 px-4 flex justify-start'>
                        <FontAwesomeIcon
                          onClick={() => {
                            setPurchaseEdit({
                              ...purchaseEdit,
                              [purchase._id]: true
                            })
                          }}
                          icon={faAngleDown} width={"15px"} className='cursor-pointer' />

                        {/* Purchase PopUp */}
                        {
                          purchaseEdit[purchase._id] &&
                          <div className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-transparent drop-shadow-2xl`}>
                            <PurchaseViewPopUp locationId={purchase.location} purchase={purchase}>
                              <div className='flex justify-between border-b border-slate-200 pb-2'>
                                <h2 className='text-base font-semibold'>Purchase Details</h2>
                                <button
                                  onClick={() => {
                                    setPurchaseEdit({
                                      ...purchaseEdit,
                                      [purchase._id]: false
                                    })
                                    getAllPurchase()
                                      .then((purchases) => {
                                        setPurchases(purchases)
                                      })
                                    
                                    getAllPurchaseInvoice().then((purchaseInvoices) => {
                                      setPurchaseInvoiceEntries(purchaseInvoices)
                                    })
                                  }}
                                  className='text-sm font-semibold text-red-500'>Close</button>
                              </div>
                            </PurchaseViewPopUp>
                          </div>
                        }
                      </td>
                    </tr>
                  </React.Fragment>
                )) :
                <tr>
                  <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>Bargain Purchases Empty!</td>
                </tr>
            }
          </tbody>
        </table>
      </div>

      <hr className='border-slate-300' />

      {/* Location Table */}
      <div>
        <button
          onClick={() => {
            setAddLocation(!addLocation)
            getAllLocation()
              .then((locations) => {
                setLocations(locations)
              })
          }}
          className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Location</button>
      </div>
      <div className={`w-80 bg-white rounded-md overflow-hidden transition-all shadow-md ${addLocation ? 'h-fit p-4' : 'h-0'}`}>
        <AddLocation />
      </div>

      <div>
        <input
          type="text"
          name="location-search"
          value={locationSearch}
          onChange={(e) => {
            setLocationSearch(e.target.value);
          }}
          placeholder='Search Location...'
          className='text-sm py-2 px-4 border border-slate-200 rounded-md' />
      </div>

      <div className='bg-white p-2 w-full md:max-w-screen-md rounded-md shadow-md shadow-slate-200'>
        <table className='w-full'>
          <thead className='border-b border-slate-100 hidden sm:table-header-group'>
            <tr>
              <th className='py-2 px-4 text-left'>Location</th>
              <th className='py-2 px-4 text-left'>Address</th>
              <th className='py-2 px-4 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              locations.length > 0 ?
                locations.filter((location) => {
                  const locationName = location.location.toLocaleLowerCase();
                  const searchLocation = locationSearch.toLocaleLowerCase();
                  if (locationName.includes(searchLocation)) {
                    return location;
                  }
                }).map((location) => (
                  <tr className='border-b border-slate-100' key={location._id}>
                    <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                      <b className='sm:hidden'>Location</b>
                      {location.location}
                    </td>
                    <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2 max-w-52 line-clamp-2 '>
                      <b className='sm:hidden'>Address</b>
                      {location.address}
                    </td>
                    <td className='py-2 px-4 text-sm flex flex-row md:flex-col items-start sm:table-cell'>
                      <b className='sm:hidden mr-4'>Action</b>
                      <button
                        onClick={() => {
                          setLocationEdit({
                            ...locationEdit,
                            [location._id]: true
                          })
                        }}
                        className='bg-blue-600 text-white text-sm font-semibold py-1 px-4 rounded-md shadow-md shadow-blue-500'>Edit</button>
                      {/* Edit option */}
                      {
                        locationEdit[location._id] &&
                        <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-transparent drop-shadow-2xl`}>
                          <div className='p-5 bg-white w-full max-w-xs rounded-md'>
                            <form className='flex flex-col gap-3 w-full' onSubmit={(e) => {
                              e.preventDefault();
                              if (locationChanges[location._id] === undefined) {
                                setLocationChangesErr('No changes made...');
                                setTimeout(() => setLocationChangesErr(''), 5000)
                              } else {
                                axios.post(`${server}/purchase/location/edit`, { ...locationChanges[location._id], id: location._id })
                                  .then((res) => {
                                    setLocationChangesSuccess(res.data)
                                    getAllLocation().then((locations) => {
                                      setLocations(locations)
                                    })

                                    setTimeout(() => setLocationChangesSuccess(''), 5000);
                                  })
                                  .catch((err) => {
                                    console.log(err)
                                  })
                              }
                            }}>
                              <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm font-semibold'>Location</label>
                                <input
                                  value={locationChanges[location._id] ? locationChanges[location._id].location ? locationChanges[location._id].location : location.location : location.location}
                                  onChange={(e) => {
                                    setLocationChanges({
                                      ...locationChanges,
                                      [location._id]: {
                                        ...locationChanges[location._id],
                                        location: e.target.value
                                      }
                                    })
                                  }}
                                  type="text" className='w-full py-2 px-3 border border-slate-200 rounded-md outline-none' />
                              </div>
                              <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm font-semibold'>Address</label>
                                <textarea
                                  value={locationChanges[location._id] ? locationChanges[location._id].address ? locationChanges[location._id].address : location.address : location.address}
                                  onChange={(e) => {
                                    setLocationChanges({
                                      ...locationChanges,
                                      [location._id]: {
                                        ...locationChanges[location._id],
                                        address: e.target.value
                                      }
                                    })
                                  }}
                                  type="text" className='w-full py-2 px-3 border border-slate-200 rounded-md outline-none'></textarea>
                              </div>
                              <div className='flex justify-between'>
                                <button
                                  className='bg-blue-600 py-2 px-5 text-sm font-semibold rounded-md text-white shadow-md shadow-blue-500'>Save</button>
                                <button
                                  onClick={() => {
                                    setLocationEdit({
                                      ...locationEdit,
                                      [location._id]: false
                                    })
                                  }}
                                  className='text-red-500 text-sm font-semibold'>Close</button>
                              </div>
                              {
                                locationChangesErr &&
                                <div>
                                  <p className='py-2 px-3 bg-red-100 text-red-600 rounded-md'>{locationChangesErr}</p>
                                </div>
                              }

                              {
                                locationChangesSuccess &&
                                <div>
                                  <p className='py-2 px-3 bg-green-100 text-green-600 rounded-md'>{locationChangesSuccess}</p>
                                </div>
                              }
                            </form>
                          </div>
                        </div>
                      }

                      <button
                        onClick={() => {
                          const confirm = window.confirm('Are you sure you want to delete this Location?')
                          if (confirm) {
                            axios.post(`${server}/purchase/location/delete-one`, { locationId: location._id })
                              .then(() => {
                                getAllLocation().then((locations) => {
                                  setLocations(locations)
                                })
                              })
                              .catch((err) => {
                                console.log(err)
                              })
                          }
                        }}
                        className='bg-red-600 text-white text-sm font-semibold ml-2 py-1 px-4 rounded-md shadow-md shadow-red-500'>Delete</button>
                    </td>
                  </tr>
                )) :
                <tr>
                  <td className='py-2 px-4 text-sm flex flex-col sm:table-cell'>Purchase Location is Empty!</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
      <hr className='border-slate-300' />


      {/* Actual Purchase */}
      <div>
        <h2 className='text-lg font-extrabold'>Purchase Invoices</h2>
      </div>
      <div className='bg-white p-2 w-full md:max-w-screen-md rounded-md shadow-md shadow-slate-200 max-h-96 overflow-auto'>
        <table className='w-full'>
          <thead className='border-b border-slate-100 hidden sm:table-header-group'>
            <tr>
              <th className='py-2 px-4 text-left'>Invoice Date</th>
              <th className='py-2 px-4 text-left'>Invoice No.</th>
              <th className='py-2 px-4 text-left'>Bargain No</th>
              <th className='py-2 px-4 text-left'>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {
              purchaseInvoiceEntries.length > 0 ?
                purchaseInvoiceEntries.map((purchase) => (
                  <React.Fragment key={purchase._id}>
                    <tr className='border-b border-slate-100'>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Invoice Date</b>
                        {purchase.createdAt.substring(0, 10).split('-').join('/')}
                      </td>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Invoice No.</b>
                        {purchase.invoiceNo}
                      </td>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Bargain No</b>
                        {purchase.againstBargainNo}
                      </td>
                      <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                        <b className='sm:hidden'>Last Updated</b>
                        {purchase.updatedAt.substring(0, 10).split('-').join('/')}
                      </td>
                      <td className='py-2 px-4 flex justify-start'>
                        <FontAwesomeIcon 
                        onClick={() => {
                          setPurchaseInvoicePopup({
                            ...purchaseInvoicePopup,
                            [purchase._id]: true
                          })
                        }}
                        icon={faAngleDown} 
                        width={"15px"} 
                        className='cursor-pointer' />

                        {/* Purchase Invoice PopUp */}
                        {
                          purchaseInvoicePopup[purchase._id] &&
                          <div className={`fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-transparent drop-shadow-2xl`}>
                            <PurchaseInvoiceViewPopup locationId={purchase.location} purchase={purchase}>
                              <div className='flex justify-between border-b border-slate-200 pb-2'>
                                <h2 className='text-base font-semibold'>Purchase Invoice</h2>
                                <button
                                  onClick={() => {
                                    setPurchaseInvoicePopup({
                                      ...purchaseInvoicePopup,
                                      [purchase._id]: false
                                    })
                                    getAllPurchaseInvoice().then((purchaseInvoices) => setPurchaseInvoiceEntries(purchaseInvoices))
                                  }}
                                  className='text-sm font-semibold text-red-500'>Close</button>
                              </div>
                            </PurchaseInvoiceViewPopup>
                          </div>
                        }
                      </td>
                    </tr>
                  </React.Fragment>
                )) :
                <tr>
                  <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>Purchases Empty!</td>
                </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Purchase