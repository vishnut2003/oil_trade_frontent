'use client';

import AddClient from '@/components/AddClient/AddClient'
import domainName from '@/domainName';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Clients = () => {

  const server = domainName();
  const [clients, setClients] = useState([]);
  useEffect(() => {
    axios.get(`${server}/clients/get-all`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [server]);

  function refreshClientsTable() {
    axios.get(`${server}/clients/get-all`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <AddClient />
      <div className="py-4 flex justify-start max-w-full">
        <div className='w-full max-w-full'>
          <div>
            <button 
            onClick={() => {
              refreshClientsTable();
            }}
            className='text-xs bg-blue-600 text-white py-2 px-3 rounded-md mb-2'>Refresh</button>
          </div>
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
                {
                  clients.map((client) => (
                    <tr
                      className="border-b hover:bg-blue-50 flex flex-col md:table-row m-1 p-3 md:m-0 md:p-0 bg-white shadow-md md:shadow-none w-full"
                      key={client._id}
                    >
                      <td className="p-2 md:py-3 md:px-5">{client.companyName}</td>
                      <td className="p-2 md:py-3 md:px-5">{client.clientName}</td>
                      <td className="p-2 md:py-3 md:px-5">{client.phoneNumber}</td>
                      <td className="p-2 md:py-3 md:px-5">{client.email}</td>
                      <td className="p-2 md:py-3 md:px-5 flex justify-start">
                        <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">History</button>
                        <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>

                        <button
                          type="button"
                          onClick={() => {
                            const confirm = window.confirm(`Are you sure you want to delete ${client.clientName} - ${client.clientCode}`)
                            if (confirm) {
                              axios.post(`${server}/clients/delete-one`, { clientId: client._id })
                                .then((res) => {
                                  window.alert('Client deleted successfully');
                                  refreshClientsTable()
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                            } else return;
                          }}
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >Delete</button></td>
                    </tr>
                  ))
                }
                {
                  clients.length == 0 &&
                  <tr>
                    <td>
                      <h1 className='py-4 px-7'>No Clients Found</h1>
                    </td>
                  </tr>
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Clients