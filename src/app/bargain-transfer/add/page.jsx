'use client';

import domainName from '@/domainName';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BargainTransferAdd = () => {

    const server = domainName();
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    const [purchaseBargains, setPurchaseBargains] = useState([]);
    const [bargainNoDropdown, setBargainNoDropdown] = useState(false);
    const [bargainNoSearch, setBargainNoSearch] = useState('');

    const [transferEntry, setTransferEntry] = useState({
        bargainNo: '',
        products: [],
        prevBargain: {},
        newBargainNo: '',
        remarks: ''
    })

    useEffect(() => {
        axios.get(`${server}/purchase/get-all`)
            .then((res) => {
                setPurchaseBargains(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [server])

    function submitTransferEntry (e) {
        e.preventDefault();

        // Validate
        if(transferEntry.bargainNo.length === 0) {
            setSubmitError('Select against bargain No.');
            setTimeout(() => setSubmitError(''), 5000);
            return;
        }
        
        axios.post(`${server}/bargain-transfer/create`, transferEntry)
            .then((res) => {
                setSubmitSuccess(res.data);
                setTimeout(() => setSubmitSuccess(''), 5000);
            })
            .catch((err) => {
                setSubmitError(err.response.data);
                setTimeout(() => setSubmitError(''), 5000);
            })
    }

    return (
        <div className='flex justify-center md:justify-start pb-10'>
            <div className='w-full max-w-xl flex flex-col gap-4'>
                <h2>Add Bargain Transfer</h2>
                <form className='w-full flex flex-col gap-2' onSubmit={submitTransferEntry}>
                    <div className='flex gap-2'>
                        <div className='flex flex-col gap-1 w-1/2'>
                            <label className='text-xs'>Current Date</label>
                            <input type="date" required disabled className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-slate-500 bg-white' value={new Date().toISOString().substring(0, 10)} />
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col gap-1 w-full relative'>
                            <label className='text-xs'>Select Bargain</label>
                            <div onClick={() => setBargainNoDropdown(!bargainNoDropdown)} className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-slate-500 w-full bg-white'>
                                {
                                    transferEntry.bargainNo ? transferEntry.bargainNo : <>Select Bargain No.</>
                                }

                            </div>

                            {/* Bargain no. selecting popup */}
                            {
                                bargainNoDropdown &&
                                <div className='p-3 bg-white w-full flex flex-col gap-3 shadow-md absolute top-0 left-0 z-10'>
                                    <div>
                                        <input
                                            value={bargainNoSearch}
                                            onChange={(e) => {
                                                setBargainNoSearch(e.target.value)
                                            }}
                                            type="text"
                                            placeholder="Seach Bargain No."
                                            className='text-sm py-2 px-3 rounded-md border border-slate-200 w-full' />
                                    </div>
                                    <div>
                                        {purchaseBargains.filter((bargains) => {
                                            const search = bargainNoSearch.toLocaleLowerCase();
                                            const bargainNo = bargains.bargainNo.toLocaleLowerCase();

                                            if (bargainNo.includes(search) || !search) {
                                                return bargains;
                                            }

                                        }).filter((bargain) => {
                                            if(bargain.status !== 'complete') {
                                                return bargain;
                                            }
                                        }).map((bargains) => (
                                            <div
                                                onClick={() => {
                                                    setTransferEntry({
                                                        bargainNo: bargains.bargainNo,
                                                        products: bargains.products,
                                                        prevBargain: bargains
                                                    })
                                                    setBargainNoDropdown(false)
                                                }}
                                                className='flex flex-nowrap justify-between items-center p-2 hover:bg-blue-50 cursor-pointer rounded-md'>
                                                <div className='text-sm font-semibold flex flex-col'>
                                                    <p>{bargains.bargainNo}</p>
                                                    <p className='text-xs font-thin'>{bargains.bargainDate.substring(0, 10).split('-').join('/')}</p>
                                                </div>
                                                <div>
                                                    {
                                                        bargains.bargainNo === transferEntry.bargainNo &&
                                                        <FontAwesomeIcon icon={faCheck} width={'20px'} className='text-blue-500' />
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }

                        </div>
                        <div className='p-2'>
                            <div className='flex flex-col gap-1 w-full relative'>
                                {
                                    transferEntry.products.length !== 0 &&
                                    <h2 className='text-sm font-bold'>Update Price</h2>
                                }
                                {transferEntry.products.map((product, index) => (
                                    < div className='text-sm font-semibold flex flex-nowrap gap-2 justify-between items-center py-2 px-3 bg-white hover:bg-blue-100 border-b border-slate-300 rounded-md'>
                                        <div className='w-max'>
                                            <p>{product.name}</p>
                                        </div>
                                        <div className='grow max-w-28'>
                                            <input
                                                required
                                                value={product.price}
                                                onChange={(e) => {
                                                    setTransferEntry(prevEntry => {
                                                        prevEntry.products[index].price = e.target.value;
                                                        return {
                                                            ...transferEntry,
                                                            products: prevEntry.products
                                                        }
                                                    })
                                                }}
                                                type="number"
                                                placeholder='Price'
                                                className='w-full box-border py-2 px-3 border border-slate-400 rounded-md' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-xs'>New Bargain No.</label>
                            <input 
                            value={transferEntry.newBargainNo}
                            onChange={(e) => setTransferEntry({
                                ...transferEntry,
                                newBargainNo: e.target.value
                            })}
                            type="text" 
                            required 
                            className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-slate-500 bg-white'/>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-xs'>Remarks</label>
                            <textarea 
                            value={transferEntry.remarks}
                            onChange={(e) => setTransferEntry({
                                ...transferEntry,
                                remarks: e.target.value
                            })}
                            type="text" 
                            required 
                            className='px-5 py-2 rounded-sm text-sm border-b border-slate-300 text-slate-500 bg-white'></textarea>
                        </div>
                    </div>

                    {/* review against bargain */}
                    {
                        Object.keys(transferEntry.prevBargain).length !== 0 &&
                        <div className='flex flex-col gap-2 bg-white p-3 rounded-md w-1/2 drop-shadow-md border border-slate-200'>
                            <div className='flex flex-nowrap justify-between items-center gap-5'>
                                <div className='text-left'>
                                    <b className='text-sm'>Bargain No.</b>
                                    <p className='text-xs'>112233333</p>
                                </div>
                                <div className='text-right'>
                                    <b className='text-sm'>Bargain Date</b>
                                    <p className='text-xs'>11/11/2001</p>
                                </div>
                            </div>
                            <div className='flex flex-nowrap justify-between items-center gap-5'>
                                <div className='text-left'>
                                    <b className='text-sm'>Created At</b>
                                    <p className='text-xs'>112233333</p>
                                </div>
                                <div className='text-left'>
                                    <b className='text-sm'>Status</b>
                                    <p className='text-xs'>Pending</p>
                                </div>
                            </div>
                        </div>
                    }

                    <div>
                        <button
                            className='text-sm font-semibold bg-blue-500 text-white p-3 w-full rounded-md shadow-md shadow-blue-400'
                            type='submit'>Create Transfer Bargain</button>
                    </div>
                    <div>
                        {
                            submitError && 
                            <p className='text-sm py-2 px-3 rounded-md bg-red-100 text-red-500 font-semibold'>{submitError}</p>
                        }
                        {
                            submitSuccess && 
                            <p className='text-sm py-2 px-3 rounded-md bg-green-100 text-green-500 font-semibold'>{submitSuccess}</p>
                        }
                    </div>
                </form>
            </div >
        </div >
    )
}

export default BargainTransferAdd