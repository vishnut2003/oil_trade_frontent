'use client';
import React, { useState } from 'react'

const AddClient = () => {

    const [popUp, setPopUp] = useState(false)

    return (
        <div>
            <button className='px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md' onClick={() => { setPopUp(true) }}>Add New Client</button>

            {popUp && (

                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-50">
                    <div className="w-full max-w-sm">
                        <form
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        >

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Name
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"
                                    placeholder="Full Name"
                                    name='name'
                                    required
                                ></input>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    required
                                    name='username'
                                ></input>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="emain"
                                    type="email"
                                    placeholder="Email Address"
                                    name='email'
                                    required
                                ></input>
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    required
                                ></input>

                            </div>

                            <div className='mb-2'>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Select a User Role</label>
                                <select
                                    id="countries"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    name='user-role'
                                    required
                                >
                                    <option value=''>- Choose Role -</option>
                                    <option value="manager">Manager</option>
                                    <option value="approver">Approver</option>
                                    <option value="user">User</option>
                                </select>
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
                                            setPopUp(false)
                                        } else {
                                            return;
                                        }
                                    }}
                                    >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AddClient