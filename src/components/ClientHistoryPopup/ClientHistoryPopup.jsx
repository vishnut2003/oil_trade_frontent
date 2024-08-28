'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useEffect } from "react";

const ClientHistoryPopup = ({children, clientId}) => {

    const server = domainName();

    useEffect(() => {
        axios.post(`${server}/clients/history`, {clientId})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [clientId])

  return (
    <div className="bg-white drop-shadow-xl p-4 flex flex-col gap-2">
      {children}
      <div>
        <h2>Popup view</h2>
      </div>
    </div>
  )
}

export default ClientHistoryPopup
