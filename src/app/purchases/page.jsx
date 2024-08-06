'use client';

import AddLocation from '@/components/AddPurchaseLocation/AddPurchaseLocation';
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

  const [locations, setLocations] = useState([]);
  const [locationEdit, setLocationEdit] = useState({});
  const [locationChanges, setLocationChanges] = useState({})
  const [locationChangesErr, setLocationChangesErr] = useState('')
  const [locationChangesSuccess, setLocationChangesSuccess] = useState('')

  useEffect(() => {
    getAllPurchase()
      .then((purchases) => {
        setPurchases(purchases)
      })
      .catch((err) => {
        console.log(err)
      })

    getAllLocation().then((locations) => {
      setLocations(locations);
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

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-3'>
        <Link href={'/purchases/add'}>
          <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Purchase</button>
        </Link>
      </div>

      {/* Purchase Entries table */}
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
            {purchases.map((purchase) => (
              <>
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
                      <p className='py-1 px-3 bg-gree-200 text-green-600 rounded-md w-max font-semibold'>Complete</p>
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
                              }}
                              className='text-sm font-semibold text-red-500'>Close</button>
                          </div>
                        </PurchaseViewPopUp>
                      </div>
                    }
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

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
          className='px-3 py-2 bg-red-600 text-white text-sm shadow-md shadow-red-600/50 rounded-md'>Add Location</button>
      </div>
      <div className={`w-80 bg-white rounded-md overflow-hidden transition-all shadow-md ${addLocation ? 'h-fit p-4' : 'h-0'}`}>
        <AddLocation />
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
            {locations.map((location) => (
              <tr className='border-b border-slate-100'>
                <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2'>
                  <b className='sm:hidden'>Location</b>
                  {location.location}
                </td>
                <td className='py-2 px-4 text-sm flex flex-col sm:table-cell gap-2 max-w-52 line-clamp-2 '>
                  <b className='sm:hidden'>Address</b>
                  {location.address}
                </td>
                <td className='py-2 px-4 text-sm flex flex-col sm:table-cell'>
                  <b className='sm:hidden'>Action</b>
                  <button
                    onClick={() => {
                      setLocationEdit({
                        ...locationEdit,
                        [location._id]: true
                      })
                    }}
                    className='bg-blue-600 text-white text-sm font-semibold ml-2 py-1 px-4 rounded-md shadow-md shadow-blue-500'>Edit</button>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Purchase