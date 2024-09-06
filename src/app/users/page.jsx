import AddUser from '@/components/AddUser/AddUser'
import UserTable from '@/components/UserTable/UserTable'
import React from 'react'

const Users = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Users</h2>
      <AddUser/>
      <div className="py-4 flex justify-start max-w-full">
        <UserTable/>
      </div>
    </div>
  )
}

export default Users