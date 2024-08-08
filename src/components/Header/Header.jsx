import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='p-3 flex justify-end'>
      <div className='flex items-center gap-3 justify-end w-max'>
        <div className='text-right'>
          <h2 className='text-base font-bold'>John david</h2>
          <p className='text-xs'>admin</p>
        </div>
        <div>
          <Image src={"/dashboard-icons/user-avatar.png"} width={40} height={40} className='rounded-full' alt='user_avatar'/>
        </div>
      </div>
    </div>
  )
}

export default Header