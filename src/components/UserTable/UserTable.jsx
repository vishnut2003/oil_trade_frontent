'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import serverName from '@/domainName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';

const UserTable = () => {

  const [users, setUsers] = useState([])

  const server = serverName();

  useEffect(() => {
    axios.get(`${server}/users`)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className='w-full'>
      <div>
        <button
          className='p-3 mb-4 bg-blue-200 rounded-full text-blue-600 flex justify-center items-center'
          onClick={() => {
            axios.get(`${server}/users`)
              .then((res) => {
                setUsers(res.data)
              })
              .catch((err) => {
                console.log(err)
              })
          }}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>
      <div className='max-w-max overflow-auto'>
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>

            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Username</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>

            {
              users.map((user) => (
                <tr className="border-b hover:bg-orange-100 " key={user._id}>
                  <td className="p-3 px-5">{user.name}</td>
                  <td className="p-3 px-5">{user.username}</td>
                  <td className="p-3 px-5">{user.email}</td>
                  <td className="p-3 px-5">{user.role}</td>
                  <td className="p-3 px-5 flex justify-end">
                    <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    <button
                      type="button"
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => {
                        const confirmDelete = window.confirm(`Are you sure you want to remove ${user.name}`);
                        if (confirmDelete) {
                          axios.post(`${server}/users/delete`, {
                            id: user._id
                          })
                            .then((res) => {
                              axios.get(`${server}/users`)
                                .then((res) => {
                                  setUsers(res.data)
                                })
                                .catch((err) => {
                                  console.log(err)
                                })
                            })
                        }
                      }}
                    >Delete</button></td>
                </tr>
              ))
            }
            {
              users.length == 0 &&
              <tr>
                <td>
                  <h1 className='py-4 px-7'>No User Found</h1>
                </td>
              </tr>
            }

          </tbody>
        </table>
      </div>
    </div>

  )
}

export default UserTable