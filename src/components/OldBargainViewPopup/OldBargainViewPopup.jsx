'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useEffect, useState } from "react";

const OldBargainViewPopup = ({ children, oldBargain }) => {

    const server = domainName();
    const [location, setLocation] = useState({})

    useEffect(() => {
        axios.post(`${server}/purchase/location/get-one`, { locationId: oldBargain.location })
            .then((res) => {
                setLocation(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [server])

    return (
        <div className="flex flex-col gap-3 text-sm text-black font-normal">
            {children}
            <div className="flex flex-nowrap gap-5 justify-between">
                <div className="flex flex-col">
                    <b>Bargain No.</b>
                    <p>{oldBargain.bargainNo}</p>
                </div>
                <div className="flex flex-col text-right">
                    <b>Bargain Date</b>
                    <p>{oldBargain.bargainDate.substring(0, 10).split('-').join('/')}</p>
                </div>
            </div>
            <div className="text-sm text-black font-normal flex flex-nowrap gap-5 justify-between">
                <div className="flex flex-col">
                    <b>Create at</b>
                    <p>{oldBargain.createdAt.substring(0, 10).split('-').join('/')}</p>
                </div>
                <div className="flex flex-col text-right">
                    <b>Remarks</b>
                    <p>{oldBargain.remarks}</p>
                </div>
            </div>
            <div className="text-sm text-black font-normal flex flex-nowrap gap-5 justify-between">
                <div className="flex flex-col">
                    <b>Location</b>
                    <p>{location.location}</p>
                    <p>{location.address}</p>
                </div>
            </div>
            <div className="border border-slate-300 rounded-md">
                <table className='w-full text-left'>
                    <thead>
                        <tr className='text-sm border-b border-slate-100'>
                            <th className='py-2 px-3'>
                                <h2 className='font-semibold'>Product Name</h2>
                            </th>
                            <th className='py-2 px-3'>
                                <p className='font-semibold'>Price</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {oldBargain.products.map((product) => (
                            <tr className='text-sm font-medium border-b border-slate-100 hover:bg-blue-100' key={product.name}>
                                <td className='py-2 px-3'>{product.name}</td>
                                <td className='py-2 px-3'>{product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default OldBargainViewPopup
