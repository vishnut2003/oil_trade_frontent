import AddClient from '@/components/AddClient/AddClient'
import React from 'react'

const Clients = () => {
  return (
    <div>
      <AddClient />
      <div className="py-4 flex justify-start max-w-full">
        <div className='w-full max-w-full'>
          <div className='max-w-full md:max-w-max'>
            <table className="w-full text-md md:bg-white md:shadow-md rounded mb-4">
              <tbody className='flex flex-wrap gap-3 md:table-row-group'>

                <tr className="border-b hidden md:table-row">
                  <th className="text-left p-3 px-5">Company Name</th>
                  <th className="text-left p-3 px-5">Client Name</th>
                  <th className="text-left p-3 px-5">Phone Number</th>
                  <th className="text-left p-3 px-5">Email</th>
                  <th></th>
                </tr>
                <tr
                  className="border-b hover:bg-orange-100 flex flex-col md:table-row m-1 p-3 md:m-0 md:p-0 bg-white shadow-md md:shadow-none w-full"
                >
                  <td className="p-2 md:py-3 md:px-5">Test company</td>
                  <td className="p-2 md:py-3 md:px-5">Name</td>
                  <td className="p-2 md:py-3 md:px-5">91 65 78 9875 54</td>
                  <td className="p-2 md:py-3 md:px-5">test@gmail.com</td>
                  <td className="p-2 md:py-3 md:px-5 flex justify-start">
                    <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">History</button>
                    <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    <button
                      type="button"
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >Delete</button></td>
                </tr>
                {/* {
              users.length == 0 &&
              <tr>
                <td>
                  <h1 className='py-4 px-7'>No User Found</h1>
                </td>
              </tr>
            } */}

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Clients