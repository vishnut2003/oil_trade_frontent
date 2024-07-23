import React from 'react'

const EditProduct = ({ productId }) => {
  return (
    <div>
      <div>
        <form>
          <input type="text" placeholder='Product Name' />
          <button>Save</button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct