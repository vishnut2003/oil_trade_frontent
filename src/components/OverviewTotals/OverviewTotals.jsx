'use client';

import domainName from "@/domainName";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect } from "react";

const OverviewTotals = () => {

    const server = domainName();
    useEffect(() => {
        axios.get(`${server}/reports/totals`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [server])

  return (
    <div className="flex gap-4">

        {/* Bargain Purchase */}
        <div className="flex flex-nowrap gap-4 text-left py-3 px-6 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCartShopping} width={'25px'} className="text-blue-600"/>
            </div>
            <div>
                <p className="text-sm text-slate-500">Bargain Purchases</p>
                <h3 className="text-2xl font-black">&#8377; 38098</h3>
            </div>

        </div>
        
        {/* Purchase */}
        <div className="flex flex-nowrap gap-4 text-left py-3 px-6 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCartShopping} width={'25px'} className="text-blue-600"/>
            </div>
            <div>
                <p className="text-sm text-slate-500">Purchases</p>
                <h3 className="text-2xl font-black">&#8377; 38098</h3>
            </div>

        </div>
        
        {/* Bargain Sales */}
        <div className="flex flex-nowrap gap-4 text-left py-3 px-6 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCartShopping} width={'25px'} className="text-blue-600"/>
            </div>
            <div>
                <p className="text-sm text-slate-500">Bargain Sales</p>
                <h3 className="text-2xl font-black">&#8377; 38098</h3>
            </div>

        </div>
        
        {/* Sales */}
        <div className="flex flex-nowrap gap-4 text-left py-3 px-6 rounded-md shadow-md hover:shadow-lg cursor-pointer transition-all">
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCartShopping} width={'25px'} className="text-blue-600"/>
            </div>
            <div>
                <p className="text-sm text-slate-500">Sales</p>
                <h3 className="text-2xl font-black">&#8377; 38098</h3>
            </div>

        </div>
    </div>
  )
}

export default OverviewTotals
