import domainName from '@/domainName'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddLocation = () => {
    const server = domainName()

    const [createError, setCreateError] = useState('')
    const [createSuccess, setCreateSuccess] = useState('')
    const [formData, setFormData] = useState({
        location: '',
        address: ''
    })

    const createPurchaseLocation = (e) => {
        e.preventDefault()
        axios.post(`${server}/purchase/location/create`, formData)
            .then((res) => {
                setCreateSuccess(res.data)
                setTimeout(() => setCreateSuccess(''), 5000)
            })
            .catch((err) => {
                if (err.code == "ERR_BAD_REQUEST") {
                    setCreateError(err.response.data)
                    setTimeout(() => setCreateError(''), 5000)
                }
            })
    }

    return (
        <form className='flex gap-2 flex-col' onSubmit={createPurchaseLocation}>
            <h2 className='text-sm font-semibold'>Create Location</h2>
            <input
                name='location'
                value={formData.location}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        location: e.target.value
                    })
                }}
                type="text"
                required
                placeholder='Enter location name'
                className='px-5 py-2 text-sm border border-slate-300 rounded-md'
            />
            <textarea
                name="address"
                placeholder='Enter address'
                value={formData.address}
                onChange={(e) => {
                    setFormData({
                        ...formData,
                        address: e.target.value
                    })
                }}
                required
                className='px-5 py-2 rounded-md text-sm border border-slate-300'
            ></textarea>
            <button
                className='text-sm px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md'
                type='submit'>Create location</button>
            {
                createError &&
                <div className='py-2 px-3 bg-red-100 border border-red-500 rounded-md'>
                    <p className='text-sm text-red-500'>{createError}</p>
                </div>
            }
            {
                createSuccess &&
                <div className='py-2 px-3 bg-green-100 border border-green-500 rounded-md'>
                    <p className='text-sm text-green-500'>{createSuccess}</p>
                </div>
            }
        </form>
    )
}

export default AddLocation