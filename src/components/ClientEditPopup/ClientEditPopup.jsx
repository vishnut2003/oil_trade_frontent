'use client';

const ClientEditPopup = ({children, client}) => {
    console.log(client)
  return (
    <div className="bg-white p-3 rounded-md  drop-shadow-2xl">
      {children}
      <div>
        <h2>Popup</h2>
      </div>
    </div>
  )
}

export default ClientEditPopup
