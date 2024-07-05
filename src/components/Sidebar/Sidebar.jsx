'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faChartLine, faGauge, faPercentage, faRightFromBracket, faSquarePollVertical, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

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
      path: '/bargain-transer',
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


  return (
    <div className='flex flex-col gap-10 justify-between h-full'>
      <div className='flex gap-2 items-center'>
        <div className='bg-blue-600 w-10 p-2 rounded-md'>
          <img src="/dashboard-icons/database-icon.png" width={100} />
        </div>
        <h2 className='text-3xl font-bold'>Oil Trade</h2>
      </div>
      <div>
        <ul className='flex flex-col gap-3'>

          {
            sidebarLinks.map((menu) => (
              <li key={menu.id} className='cursor-pointer bg-white text-slate-600'>
                <Link href={menu.path}>
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
      <div className='flex items-center gap-3 p-3 text-slate-600 cursor-pointer'>
        <FontAwesomeIcon icon={faRightFromBracket} width='17px' />
        <p>Log Out</p>
      </div>
    </div>
  )
}

export default Sidebar