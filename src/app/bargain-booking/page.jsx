'use client';

import AddSalesLocation from '@/components/AddSalesLocation/AddSalesLocation';
import BargainSalesViewPopup from '@/components/BargainSalesViewPopup/BargainSalesViewPopup';
import domainName from '@/domainName';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link'
import { useEffect, useState } from 'react'

const BargainBooking = () => {
  const server = domainName();

  const [locationAddPopup, setLocationAddPopup] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [locations, setLocations] = useState([])
  const [locationEdit, setLocationEdit] = useState({});
  const [locationChanges, setLocationChanges] = useState({})
  const [locationChangesErr, setLocationChangesErr] = useState('');
  const [locationChangesSuccess, setLocationChangesSuccess] = useState('');

  const [salesBargains, setSalesBargains] = useState([]);
  const [salesViewPopup, setSalesViewPopup] = useState({})

  useEffect(() => {
    axios.get(`${server}/sales/location/get-all`)
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get(`${server}/sales/bargain/get-all`)
      .then((res) => {
        setSalesBargains(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [server])

  function getAllLocation() {
    axios.get(`${server}/sales/location/get-all`)
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className='flex flex-col gap-4 mb-6'>
      <div className='flex gap-3'>
        <Link href={'/bargain-booking/add'}>
          <button className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Bargain Sales</button>
        </Link>
      </div>

      <div className='bg-white p-2 w-full md:max-w-screen-md rounded-md shadow-md shadow-slate-200'>
        <table className='w-full text-left'>
          <thead className='border-b border-slate-100'>
            <tr>
              <th className='py-2 px-4 text-sm'>Bargain Date</th>
              <th className='py-2 px-4 text-sm'>Bargain No.</th>
              <th className='py-2 px-4 text-sm'>Created At</th>
              <th className='py-2 px-4 text-sm'>Status</th>
              <th className='py-2 px-4 text-sm'></th>
            </tr>
          </thead>
          <tbody>
            {
              salesBargains.length !== 0 ?
                salesBargains.map((bargain) => (
                  <tr key={bargain.bargainNo}>
                    <td className='py-2 px-4 text-sm'>{bargain.bargainDate.substring(0, 10).split('-').join('/')}</td>
                    <td className='py-2 px-4 text-sm'>{bargain.bargainNo}</td>
                    <td className='py-2 px-4 text-sm'>{bargain.createdAt.substring(0, 10).split('-').join('/')}</td>
                    <td className='py-2 px-4 text-sm'>
                      {
                        bargain.status === 'pending' && <p className='text-sm py-1 px-2 rounded-md bg-red-200 text-red-500 font-semibold w-max'>Pending</p>
                      }
                      {
                        bargain.status === 'partial' && <p className='text-sm py-1 px-2 rounded-md bg-yellow-200 text-yellow-500 font-semibold w-max'>Partial</p>
                      }
                      {
                        bargain.status === 'complete' && <p className='text-sm py-1 px-2 rounded-md bg-green-200 text-green-500 font-semibold w-max'>complete</p>
                      }

                    </td>
                    <td className='py-2 px-4 text-sm'>
                      <FontAwesomeIcon
                        onClick={() => setSalesViewPopup({
                          ...salesViewPopup,
                          [bargain._id]: true
                        })}
                        icon={faAngleDown} width={'15px'} className='cursor-pointer' />
                      {
                        salesViewPopup[bargain._id] &&
                        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                          <div className='p-2 drop-shadow-2xl bg-white rounded-md'>
                            <BargainSalesViewPopup salesBargainId={bargain._id}>
                              <div className='flex flex-nowrap gap-2 justify-between border-b border-slate-100 pb-3'>
                                <div>
                                  <h2 className='text-base font-semibold'>Sales Bargain Details</h2>
                                </div>
                                <div>
                                  <p
                                    onClick={() => {
                                      setSalesViewPopup({
                                        ...salesViewPopup,
                                        [bargain._id]: false
                                      })
                                      axios.get(`${server}/sales/bargain/get-all`)
                                        .then((res) => {
                                          setSalesBargains(res.data);
                                        })
                                        .catch((err) => {
                                          console.log(err);
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
                )) :
                <tr>
                  <td className='py-2 px-4 text-sm'>Sales Bargain is empty!</td>

                </tr>
            }
          </tbody>
        </table>
      </div>

      <hr color='#cecece' />

      {/* location add and table */}
      <div className='flex flex-col gap-3'>
        <div>
          <button
            onClick={() => {
              setLocationAddPopup(!locationAddPopup)
              getAllLocation();
            }}
            className='px-3 py-2 bg-blue-600 text-white text-sm shadow-md shadow-blue-600/50 rounded-md'>Add Location</button>
        </div>
        <div className={`w-80 bg-white rounded-md overflow-hidden transition-all shadow-md ${locationAddPopup ? 'h-fit p-4' : 'h-0'}`}>
          <AddSalesLocation />
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
                                  console.log(locationChanges[location._id])
                                  console.log(location._id)
                                  axios.post(`${server}/sales/location/edit`, { ...locationChanges[location._id], id: location._id })
                                    .then((res) => {
                                      setLocationChangesSuccess(res.data)
                                      getAllLocation()
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
                              axios.post(`${server}/sales/location/delete-one`, { locationId: location._id })
                                .then(() => {
                                  getAllLocation()
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
                    <td className='py-2 px-4 text-sm flex flex-col sm:table-cell'>Sales Location is Empty!</td>
                  </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BargainBooking