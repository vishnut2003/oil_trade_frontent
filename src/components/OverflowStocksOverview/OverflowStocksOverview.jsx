'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useEffect } from "react"

const OverflowStocksOverview = () => {

  const server = domainName();

  useEffect(() => {
    axios.get(`${server}/overflow-stocks/all`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [server])

  return (
    <div>
      <table className="w-full max-w-screen-md rounded-md overflow-hidden shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-3 bg-blue-500 text-white font-semibold text-left">Product Name</th>
            <th className="py-2 px-3 bg-blue-500 text-white font-semibold text-left">Quantity</th>
            <th className="py-2 px-3 bg-blue-500 text-white font-semibold text-left">Virtual Sold</th>
            <th className="py-2 px-3 bg-blue-500 text-white font-semibold text-left">Overflow Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-slate-100 odd:bg-white">
            <td className="text-sm py-2 px-3">Product 1</td>
            <td className="text-sm py-2 px-3">1000</td>
            <td className="text-sm py-2 px-3">2000</td>
            <td className="text-sm py-2 px-3">3000</td>
          </tr>

        </tbody>
      </table>
    </div>
  )
}

export default OverflowStocksOverview