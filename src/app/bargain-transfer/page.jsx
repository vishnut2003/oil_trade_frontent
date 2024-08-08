'use client';

import AddLocation from '@/components/AddPurchaseLocation/AddPurchaseLocation';
import PurchaseViewPopUp from '@/components/purchaseViewPopUp/PurchaseViewPopUp';
import domainName from '@/domainName';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const BargainTransfer = () => {

  const [addLocation, setAddLocation] = useState(false);
  const server = domainName();
  const [purchases, setPurchases] = useState([]);
  const [purchaseEdit, setPurchaseEdit] = useState({});

  const [locations, setLocations] = useState([]);

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
  }, [getAllPurchase, getAllLocation])

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
        <Link href={'/bargain-transfer/add'}>
          <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Bargain Transfer</button>
        </Link>
      </div>

      {/* Bargain Transfer Entries table */}
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
    </div>
  )
}

export default BargainTransfer