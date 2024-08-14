'use client';
import domainName from '@/domainName';
import axios from 'axios';
import React, { useState } from 'react'

const AddClient = () => {
    const server = domainName();
    const [popUp, setPopUp] = useState(false)
    const [clientData, setClientData] = useState({
        companyName: '',
        clientName: '',
        email: '',
        phoneNumber: '',
        address: ''
    });
    const [clientCreatedSuccess, setClientCreatedSuccess] = useState('');
    const [clientCreatedErr, setClientCreatedErr] = useState('');

    function enterClientData(e) {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value
        })
    }

    function submitClientData(e) {
        e.preventDefault();
        axios.post(`${server}/clients/create-one`, clientData)
            .then((res) => {
                setClientCreatedSuccess(res.data)
                setTimeout(() => setClientCreatedSuccess(''), 5000);
            })
            .catch((err) => {
                setClientCreatedErr(err.response.data);
                setTimeout(() => setClientCreatedErr(''), 5000);
            })
    }

    return (
        <div>
            <button className='px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md' onClick={() => { setPopUp(true) }}>Add New Client</button>

            {popUp && (

                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-50">
                    <div className="w-full max-w-sm">
                        <form
                            onSubmit={submitClientData}
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        >

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Company Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={clientData.companyName}
                                    onChange={enterClientData}
                                    placeholder="Company Name"
                                    name='companyName'
                                    required
                                ></input>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Client Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={clientData.clientName}
                                    onChange={enterClientData}
                                    placeholder="Client Name"
                                    required
                                    name='clientName'
                                ></input>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="email"
                                    value={clientData.email}
                                    onChange={enterClientData}
                                    placeholder="Email Address"
                                    name='email'
                                    required
                                ></input>
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    type="text"
                                    value={clientData.phoneNumber}
                                    onChange={enterClientData}
                                    placeholder="Phone Number"
                                    name='phoneNumber'
                                    required
                                ></input>

                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Address
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Address"
                                    value={clientData.address}
                                    onChange={enterClientData}
                                    name='address'
                                    required
                                ></textarea>

                            </div>

                            {/* {
                                errorMessage && (
                                    <div className='mb-4 py-3 px-4 bg-red-200 text-red-600 rounded-md'>
                                        <p className="text-xs italic">{errorMessage}</p>
                                    </div>
                                )
                            } */}

                            {/* {
                                successMessage && (
                                    <div className='mb-4 py-3 px-4 bg-green-200 text-green-600 rounded-md'>
                                        <p className="text-xs italic">{successMessage}</p>
                                    </div>
                                )
                            } */}

                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save User
                                </button>
                                <button
                                    className='bg-red-600 hover:bg-red-800 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                    type='button'
                                    onClick={() => {
                                        const confirm = window.confirm('Are you sure you want to cancel')
                                        if (confirm) {
                                            setClientData({
                                                companyName: '',
                                                clientName: '',
                                                email: '',
                                                phoneNumber: '',
                                                address: ''
                                            })
                                            setPopUp(false)
                                        } else {
                                            return;
                                        }
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                            {
                                clientCreatedSuccess &&
                                <div>
                                    <p className='text-sm bg-green-100 text-green-500 font-semibold py-2 px-3 rounded-md mt-2'>{clientCreatedSuccess}</p>
                                </div>
                            }
                            
                            {
                                clientCreatedErr &&
                                <div>
                                    <p className='text-sm bg-red-100 text-red-500 font-semibold py-2 px-3 rounded-md mt-2'>{clientCreatedErr}</p>
                                </div>
                            }

                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AddClient