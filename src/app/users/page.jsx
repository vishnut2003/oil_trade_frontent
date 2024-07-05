import AddUser from '@/components/AddUser/AddUser'
import UserTable from '@/components/UserTable/UserTable'
import React from 'react'

const Users = () => {
  return (
    <div>
      <AddUser/>
      <div className="py-4 flex justify-start max-w-full">
        <UserTable/>
      </div>
    </div>
  )
}

export default Users