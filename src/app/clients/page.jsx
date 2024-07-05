import React from 'react'

const Clients = () => {
  return (
    <div>

      <div className='max-w-max'>
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>

          <tr className="border-b">
            <th className="text-left p-3 px-5">Company Name</th>
            <th className="text-left p-3 px-5">Client Name</th>
            <th className="text-left p-3 px-5">Phone Number</th>
            <th className="text-left p-3 px-5">Email</th>
            <th></th>
          </tr>

              <tr className="border-b hover:bg-orange-100 ">
                <td className="p-3 px-5">WebSpider Solutions</td>
                <td className="p-3 px-5">Aditya</td>
                <td className="p-3 px-5">91 96 3315 96 30</td>
                <td className="p-3 px-5">adity@gmail.com</td>
                <td className="p-3 px-5 flex justify-end">
                  <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  >Delete</button></td>
              </tr>
            <tr>
              <td>
                <h1 className='py-4 px-7'>No User Found</h1>
              </td>
            </tr>

        </tbody>
      </table>
      </div>

    </div>
  )
}

export default Clients