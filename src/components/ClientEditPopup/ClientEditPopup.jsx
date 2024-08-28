'use client';

import domainName from "@/domainName";
import axios from "axios";
import { useEffect, useState } from "react";

const ClientEditPopup = ({ children, client }) => {

  const server = domainName();
  
  const [submitErr, setSubmitErr] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [clientDetails, setClientDetails] = useState({
    clientName: '',
    companyName: '',
    clientCode: '',
    phoneNumber: '',
    email: ''
  });

  useEffect(() => {
    setClientDetails({
      clientName: client.clientName,
      companyName: client.companyName,
      clientCode: client.clientCode,
      phoneNumber: client.phoneNumber,
      email: client.email
    });
  }, [setClientDetails])

  function enterData (e) {
    setClientDetails({
      ...clientDetails,
      [e.target.name]: e.target.value
    })
  }

  function submitChanges (e) {
    e.preventDefault();
    
    // Check if no changes made and return if exit if no changes
    if(
      clientDetails.clientName === client.clientName &&
      clientDetails.companyName === client.companyName &&
      clientDetails.phoneNumber === client.phoneNumber &&
      clientDetails.email === client.email
    ) {
      setSubmitErr('No changes made...')
      setTimeout(() => setSubmitErr(''), 5000);
      return
    }

    axios.post(`${server}/clients/edit-one`, {...clientDetails, _id: client._id})
      .then((res) => {
        console.log(res);
        setSubmitSuccess(res.data);
        setTimeout(() => setSubmitSuccess(''), 5000);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="bg-white p-5 rounded-md  drop-shadow-2xl flex flex-col gap-3 max-w-80 w-full">
      {children}
      <div>
        <form onSubmit={submitChanges} className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col grow">
              <label className="text-sm font-semibold">Client Code</label>
              <input 
              name="clientCode"
              value={clientDetails.clientCode}
              onChange={enterData}
              type="text" disabled className="text-sm py-2 px-3 border-0 rounded-md bg-slate-300" />
            </div>
            <div className="flex flex-col grow">
              <label className="text-sm font-semibold">Client Name</label>
              <input 
              name="clientName"
              value={clientDetails.clientName}
              onChange={enterData}
              type="text" className="text-sm py-2 px-3 border-2 border-blue-500 rounded-md" />
            </div>
            <div className="flex flex-col grow">
              <label className="text-sm font-semibold">Company Name</label>
              <input 
              name="companyName"
              value={clientDetails.companyName}
              onChange={enterData}
              type="text" className="text-sm py-2 px-3 border-2 border-blue-500 rounded-md" />
            </div>
            <div className="flex flex-col grow">
              <label className="text-sm font-semibold">Phone Number</label>
              <input 
              name="phoneNumber"
              value={clientDetails.phoneNumber}
              onChange={enterData}
              type="text" className="text-sm py-2 px-3 border-2 border-blue-500 rounded-md" />
            </div>
            <div className="flex flex-col grow">
              <label className="text-sm font-semibold">Company Name</label>
              <input 
              name="email"
              value={clientDetails.email}
              onChange={enterData}
              type="text" className="text-sm py-2 px-3 border-2 border-blue-500 rounded-md" />
            </div>
            <button
            type="submit"
            className="text-sm font-semibold py-2 px-3 bg-blue-500 rounded-md shadow-md shadow-blue-600 text-white"
            >Save Changes</button>
          </div>
          {
            submitErr &&
            <div>
              <p className="text-sm font-semibold py-2 px-3 rounded-md text-red-500 bg-red-100">{submitErr}</p>
            </div>
          }
          {
            submitSuccess &&
            <div>
              <p className="text-sm font-semibold py-2 px-3 rounded-md text-green-500 bg-green-100">{submitSuccess}</p>
            </div>
          }
        </form>
      </div>
    </div>
  )
}

export default ClientEditPopup
