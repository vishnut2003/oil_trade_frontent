'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useState } from "react";

const AddSalesLocation = () => {

    const server = domainName();
    const [formDate, setFormData] = useState({
        location: '',
        address: ''
    })

    const [locatioCreateSuccess, setLocationCreateSuccess] = useState('');
    const [locationCreateErr, setLocationCreateErr] = useState('');

    function enterFormData(e) {
        setFormData({
            ...formDate,
            [e.target.name]: e.target.value
        })
    }

    function submitSalesLocationData(e) {
        e.preventDefault();
        axios.post(`${server}/sales/location/create-one`, formDate)
            .then((res) => {
                setLocationCreateSuccess(res.data);
                setFormData({
                    location: '',
                    address: ''
                })
                setTimeout(() => setLocationCreateSuccess(''), 5000);
            })
            .catch((err) => {
                setLocationCreateErr(err.response.data);
                setTimeout(() => setLocationCreateErr(''), 5000);
            })
    }

    return (
        <form className='flex gap-2 flex-col' onSubmit={submitSalesLocationData}>
            <h2 className='text-sm font-semibold'>Create Location</h2>
            <input
                name='location'
                type="text"
                value={formDate.location}
                onChange={enterFormData}
                required
                placeholder='Enter location name'
                className='px-5 py-2 text-sm border border-slate-300 rounded-md'
            />
            <textarea
                name="address"
                placeholder='Enter address'
                value={formDate.address}
                onChange={enterFormData}
                required
                className='px-5 py-2 rounded-md text-sm border border-slate-300'
            ></textarea>
            <button
                className='text-sm px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md'
                type='submit'>Create location</button>
            {
                locationCreateErr &&
                <div className='py-2 px-3 bg-red-100 border border-red-500 rounded-md'>
                    <p className='text-sm text-red-500'>{locationCreateErr}</p>
                </div>
            }
            {
                locatioCreateSuccess &&
                <div className='py-2 px-3 bg-green-100 border border-green-500 rounded-md'>
                    <p className='text-sm text-green-500'>{locatioCreateSuccess}</p>
                </div>
            }
        </form>
    )
}

export default AddSalesLocation