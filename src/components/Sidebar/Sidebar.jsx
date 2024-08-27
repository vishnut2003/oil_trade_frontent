'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faChartLine, faGauge, faPercentage, faRightFromBracket, faSquarePollVertical, faUserTie, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';

const Sidebar = () => {

  const sidebarLinks = [
    {
      title: 'Reports',
      path: '/',
      icon: faSquarePollVertical,
      id: 1
    },
    {
      title: 'Own Purchase',
      path: '/purchases',
      icon: faCartShopping,
      id: 2
    },
    {
      title: 'Bargain Trasfer',
      path: '/bargain-transfer/add',
      icon: faPercentage,
      id: 3
    },
    {
      title: 'Bargain Booking',
      path: '/bargain-booking',
      icon: faCalendar,
      id: 4
    },
    {
      title: 'Sales',
      path: '/sales',
      icon: faChartLine,
      id: 5
    },
    {
      title: 'Products',
      path: '/products',
      icon: faProductHunt,
      id: 6
    },
    {
      title: 'Clients',
      path: '/clients',
      icon: faUserTie,
      id: 7
    },
    {
      title: 'Users',
      path: '/users',
      icon: faUser,
      id: 8
    }
  ]

  const pathname = usePathname()

  const [sidebar, setSidebar] = useState(false)

  return (
    <div className={
      sidebar ? 'fixed md:static flex flex-col gap-10 justify-between min-w-60 h-screen max-h-screen shadow-xl p-4 overflow-auto bg-white transition-all z-10' :
        'static flex flex-col gap-10 justify-between min-w-0 md:min-w-60 w-10 h-screen max-h-screen shadow-xl md:p-4 overflow-auto bg-white transition-all z-10'
    }>
      <div className='flex gap-2 items-center'>
        <div className={
          sidebar ? 'bg-blue-600 w-14 p-1 rounded-sm' :
            'bg-blue-600 w-14 p-1 rounded-sm hidden md:flex'
        }>
          <Image src={"/dashboard-icons/database-icon.png"} width={200} height={200} alt='site logo' />
        </div>
        <h2
          className={
            sidebar ? 'text-lg leading-5 font-bold' :
              'text-lg leading-5 font-bold hidden md:flex'
          }
        >Oil Trade</h2>
        <div
        className={`w-full flex ${sidebar ? 'justify-end' : 'justify-center mt-3'}`}
          onClick={() => {
            setSidebar(!sidebar)
          }}
        >
          <FontAwesomeIcon icon={sidebar ? faXmark : faBars} width={25} className={'text-blue-600 md:hidden'} />
        </div>
      </div>
      <div>
        <ul
          className={
            sidebar ? 'flex flex-col gap-3' :
              'flex-col gap-3 hidden md:flex'
          }
        >

          {
            sidebarLinks.map((menu) => (
              <li key={menu.id} className='cursor-pointer bg-white text-slate-600 min-w-max'>
                <Link
                  href={menu.path}
                  onClick={() => {
                    setSidebar(!sidebar)
                  }}
                >
                  <div className={pathname === menu.path ? 'flex items-center gap-3 px-5 py-3 bg-blue-600 shadow-md shadow-blue-600/50  text-white rounded-md' : 'flex items-center gap-3 px-5 py-3 bg-white text-slate-600 rounded-md'}>
                    <FontAwesomeIcon icon={menu.icon} width={14} />
                    <span>{menu.title}</span>
                  </div>
                </Link>
              </li>
            ))
          }

        </ul>
      </div>
      <div
        className={
          sidebar ? 'flex items-center gap-3 p-3 text-slate-600 cursor-pointer' :
            'hidden md:flex items-center gap-3 p-3 text-slate-600 cursor-pointer'
        }
      >
        <FontAwesomeIcon icon={faRightFromBracket} width='17px' />
        <p>Log Out</p>
      </div>
    </div>
  )
}

export default Sidebar