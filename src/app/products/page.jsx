'use client';

import domainName from '@/domainName';
import { faAngleDown, faCheck, faCircleExclamation, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Products = () => {

  const server = domainName()
  const [curDate, setCurDate] = useState(new Date().toISOString().substring(0, 10))

  // Product Create Section
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [createProductErr, setCreateProductErr] = useState('')
  const [createProductSuccess, setCreateProductSuccess] = useState('')
  const [createProductLoading, setCreateProductLoading] = useState(false)
  const [productLists, setProductsList] = useState([])

  // Product Edition section
  const [productsEdited, setProductsEdited] = useState({})
  const [productsEditLoading, setProductsEditLoading] = useState({})
  const [productsEditSuccess, setProductsEditSuccess] = useState({})
  const [productPrevDetails, setProductPrevDetails] = useState({})

  useEffect(() => {
    getAllProducts()
  }, [server])

  // Get all products
  const getAllProducts = () => {
    axios.get(`${server}/products/all`)
      .then((res) => {
        setProductsList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Submit new product
  const createProduct = (e) => {
    e.preventDefault()
    setCreateProductLoading(true)
    const newProduct = { name: productName, price: productPrice }
    axios.post(`${server}/products/create`, newProduct)
      .then((res) => {
        setCreateProductLoading(false)
        setCreateProductErr('')
        setCreateProductSuccess(res.data)
        getAllProducts()
        setTimeout(() => setCreateProductSuccess(''), 5000);
      })
      .catch((err) => {
        setCreateProductLoading(false)
        if (err.code === "ERR_BAD_REQUEST") {
          setCreateProductSuccess('')
          setCreateProductErr(err.response.data)
          setTimeout(() => setCreateProductErr(''), 5000)
        } else {
          console.log(err)
        }
      })
  }

  return (
    <div>
      <div className='bg-white p-3 mb-2 rounded-md shadow-sm flex flex-col gap-4 lg:max-w-2xl'>
        <h2 className='text-slate-800 font-semibold text-lg'>Product data</h2>
        <div className='flex justify-between gap-3 flex-col md:flex-row'>
          {/* <input
            type="date"
            value={curDate}
            onChange={(e) => {
              setCurDate(e.target.value)
              ajaxDateFilter(e)
            }}
            className='py-2 px-4 text-sm rounded-md shadow-md shadow-slate-200' /> */}
          <input type="text" placeholder='Search product' className='py-2 px-4 text-sm rounded-md shadow-md shadow-slate-200' />
        </div>
        <div>

          {/* Table */}
          <div className='border border-slate-100 rounded-md'>

            {/* Table row */}
            {
              productLists.map((product, index) => (
                <div className='flex flex-col'>
                  <div key={index} className='flex gap-2 justify-between items-center px-5 py-2 border-b border-slate-100  hover:bg-blue-50 w-full'>
                    <div className='grow'>
                      <h3 className='text-sm'>
                        <input
                          type="text"
                          value={productsEdited[product._id] ? productsEdited[product._id].name : product.name}
                          onChange={(e) => {
                            setProductsEdited({
                              ...productsEdited,
                              [product._id]: {
                                ...productsEdited[product._id],
                                name: e.target.value,
                                id: product._id
                              }
                            })
                          }}
                          className='bg-transparent text-sm py-1'
                        />
                        <p
                          onClick={() => {
                            setProductPrevDetails({
                              ...productPrevDetails,
                              [product._id]: productPrevDetails[product._id] === false || undefined ? true : false
                            })
                          }}
                          className='text-xs text-blue-600 cursor-pointer'>Previous Price <FontAwesomeIcon icon={faAngleDown} width={10} /></p>
                      </h3>
                    </div>
                    <div className='flex gap-3 items-center'>
                      <p
                        className='text-sm text-slate-500 font-semibold'
                      ><input
                          type="number"
                          className='max-w-16'
                          value={productsEdited[product._id] ? productsEdited[product._id].price : product.price}
                          onChange={(e) => {
                            setProductsEdited({
                              ...productsEdited,
                              [product._id]: {
                                ...productsEdited[product._id],
                                price: e.target.value,
                                id: product._id
                              }
                            })
                          }}
                        /> &#8377; / Unit</p>
                      <button
                        onClick={() => {
                          const confirm = window.confirm('Please confirm to updating the Product details')
                          if (confirm) {
                            setProductsEditLoading({
                              ...productsEditLoading,
                              [product._id]: true
                            })
                            axios.post(`${server}/products/edit-single`, productsEdited[product._id])
                              .then((res) => {
                                setProductsEditLoading({
                                  ...productsEditLoading,
                                  [product._id]: false
                                })

                                setProductsEditSuccess({
                                  ...productsEditSuccess,
                                  [product._id]: true
                                })

                                getAllProducts()

                                setTimeout(() => {
                                  setProductsEditSuccess({
                                    ...productsEditSuccess,
                                    [product._id]: false
                                  })
                                }, 5000)

                                window.alert(res.data)
                              })
                              .catch((err) => {
                                setProductsEditLoading({
                                  ...productsEditLoading,
                                  [product._id]: false
                                })

                                window.alert(err.code)
                              })
                          } else return
                        }}
                        className='px-4 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md text-xs flex items-center gap-2'>
                        {
                          productsEditLoading[product._id] &&
                          <div className='h-2 w-2 rounded-full border border-white border-r-0 border-b-0 animate-spin'></div>
                        }
                        {
                          productsEditSuccess[product._id] &&
                          <FontAwesomeIcon icon={faCheck} width={10} />
                        }
                        Save</button>
                    </div>
                  </div>
                  <div className={'p-2'}>
                    {
                      <div className={`max-h-52 transition-all ${productPrevDetails[product._id] ? 'h-full p-3 opacity-100' : 'h-0 opacity-0'} overflow-auto border border-slate-100 rounded-md shadow-md`}>
                        <ul>
                          <li>Hello</li>
                          <li>Hello</li>
                        </ul>
                      </div>
                    }
                  </div>
                </div>
              ))
            }

          </div>
        </div>
      </div>

      <hr className='text-slate-400 py-2' />

      {/* Product create section */}
      <div className='flex flex-col gap-3 lg:max-w-2xl'>
        <h2 className='text-slate-800 font-semibold text-lg'>Products</h2>
        <div>
          <form onSubmit={createProduct} className='flex gap-4 flex-col md:flex-row'>
            <input
              type="text"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value)
              }}
              placeholder='Product Name'
              className='py-2 px-4 text-sm rounded-md'
            />
            <input
              type="number"
              value={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value)
              }}
              placeholder='Price'
              className='py-2 px-4 text-sm rounded-md'
            />
            <button
              type='submit'
              className='px-3 py-2 bg-blue-600 text-white shadow-md shadow-blue-600/50 rounded-md flex items-center justify-center gap-2'
            >
              {
                createProductLoading &&
                <div className='w-3 h-3 border border-b-0 border-r-0 border-white rounded-full animate-spin'></div>
              }
              Create</button>
          </form>
          {
            createProductErr &&
            <p className='text-sm text-red-500 py-1 px-4 text-center md:text-left'>{createProductErr}</p>
          }

          {
            createProductSuccess &&
            <p className='text-sm text-green-500 py-1 px-4 text-center md:text-left'>{createProductSuccess}</p>
          }
        </div>
        <div className='border border-slate-200 min-w-64 md:max-w-max rounded-md flex flex-wrap gap-2 p-2'>
          {
            productLists.map((product, index) => (
              <p className='box-border py-2 px-4 bg-slate-200 w-max rounded-md text-sm text-slate-500' key={index}>
                <FontAwesomeIcon
                  icon={faTimes}
                  width={9}
                  onClick={() => {
                    const confirm = window.confirm(`Are you sure you want to delete ${product.name}. all the data related to this will be deleted and can not undo this action`)
                    if (confirm) {
                      axios.get(`${server}/products/delete/${product._id}`)
                        .then((res) => {
                          window.alert(res.data)
                          getAllProducts()
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                    }
                  }}
                  className='mr-2 text-red-400 cursor-pointer' />
                {product.name}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Products