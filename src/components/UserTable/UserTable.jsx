'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import serverName from '@/domainName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import UserEditPopup from '../UserEditPopup/UserEditPopup';

const UserTable = () => {

  const [users, setUsers] = useState([]);
  const [userEditPopup, setUserEditPopup] = useState({});

  const server = serverName();

  useEffect(() => {
    axios.get(`${server}/users`)
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [server])

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
      <div className='md:max-w-max w-full'>
        <table className="w-full text-md md:bg-white md:shadow-md rounded mb-4">
          <tbody className='w-full flex flex-wrap gap-3 md:table-row-group'>

            <tr className="border-b hidden md:table-row">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Username</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>

            {
              users.map((user) => (
                <tr
                  className="border-b hover:bg-orange-100 flex flex-col md:table-row m-1 p-3 md:m-0 md:p-0 bg-white shadow-md md:shadow-none w-full"
                  key={user._id}
                >
                  <td className="p-2 md:py-3 md:px-5">{user.name}</td>
                  <td className="p-2 md:py-3 md:px-5">{user.username}</td>
                  <td className="p-2 md:py-3 md:px-5">{user.email}</td>
                  <td className="p-2 md:py-3 md:px-5">{user.role}</td>
                  <td className="p-2 md:py-3 md:px-5 flex justify-start">
                    <button
                      onClick={() => setUserEditPopup({
                        ...userEditPopup,
                        [user._id]: true
                      })}
                      type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                    {
                      userEditPopup[user._id] &&
                      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
                        <UserEditPopup userId={user._id}>
                          <div className='flex flex-nowrap justify-between items-center gap-4 pb-2 border-b border-slate-300'>
                            <h2 className='text-lg font-semibold'>User Edit</h2>
                            <p 
                            onClick={() => setUserEditPopup({
                              ...userEditPopup,
                              [user._id]: false
                            })}
                            className='text-sm font-semibold text-red-600 cursor-pointer'>Close</p>
                          </div>
                        </UserEditPopup>
                      </div>
                    }
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