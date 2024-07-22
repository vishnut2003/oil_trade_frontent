import React from 'react'

const AddLocation = () => {
    return (
        <form className='flex gap-2 flex-col'>
            <input 
            name='location' 
            type="text" 
            placeholder='Enter location name'
            className='px-5 py-2 rounded-sm text-sm border-b border-slate-300'
             />
            <textarea 
            name="address" 
            placeholder='Enter address'
            className='px-5 py-2 rounded-sm text-sm border-b border-slate-300'
            ></textarea>
            <button 
            className='text-sm px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md'
            type='submit'>Create location</button>
        </form>
    )
}

export default AddLocation