import React, { useContext } from 'react'
import { BillQuoteContext } from '../pages/service/SerDash'

export const ServiceQuote = () => {
    const { togQuote, togglequote, quote, openQuote, toggleOpenQuote, data } = useContext(BillQuoteContext)

    return (
        <>
            {togQuote && (
                <div className='fixed inset-0 z-40 overflow-y-auto bg-black/60 flex items-start justify-center py-10 px-4'>
                    <div className='relative w-full max-w-5xl rounded-2xl bg-white p-6'>
                        <button
                            onClick={togglequote}
                            className='absolute right-5 top-4 rounded-2xl bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-red-400 hover:text-white'
                        >
                            x
                        </button>
                        <h2 className='text-center font-semibold mt-10 text-lg'>Quotation List</h2>
                        <div className='overflow-x-auto mt-6'>
                            <table className='table-auto w-full border-collapse border border-gray-400'>
                                <thead>
                                    <tr className='bg-gray-200'>
                                        <th className='border border-gray-400 px-4 py-2'>Customer Name</th>
                                        <th className='border border-gray-400 px-4 py-2'>Phone</th>
                                        <th className='border border-gray-400 px-4 py-2'>Created By</th>
                                        <th className='border border-gray-400 px-4 py-2'>Total Amount</th>
                                        <th className='border border-gray-400 px-4 py-2'>Date</th>
                                        <th className='border border-gray-400 px-4 py-2'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {quote.map((item) => (
                                        <tr key={item._id}>
                                            <td className='border border-gray-400 px-4 py-2'>{item.customerName}</td>
                                            <td className='border border-gray-400 px-4 py-2'>{item.phone}</td>
                                            <td className='border border-gray-400 px-4 py-2'>{item.createdBy.name}</td>
                                            <td className='border border-gray-400 px-4 py-2'>₹{item.totalAmount}</td>
                                            <td className='border border-gray-400 px-4 py-2'>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td className='border border-gray-400 px-4 py-2'>
                                                <button
                                                    onClick={() => toggleOpenQuote(item._id)}
                                                    className='rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-500'
                                                >
                                                    open
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {openQuote && (
                <div className='fixed inset-0 z-40 overflow-y-auto bg-black/60 flex items-start justify-center py-10 px-4'>
                    <div className='relative w-full max-w-4xl rounded-2xl bg-white p-6'>
                        <button
                            onClick={toggleOpenQuote}
                            className='absolute right-5 top-4 rounded-2xl bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-red-400 hover:text-white'
                        >
                            x
                        </button>
                        <div className='overflow-auto'>
                            <h2 className='text-center text-2xl font-semibold'>Quotation</h2>
                            <div className='mt-6 space-y-4'>
                                <p className='text-lg font-semibold'>Customer Name: <span className='font-normal'>{data.customerName}</span></p>
                                <p className='text-lg font-semibold'>Customer Phone: <span className='font-normal'>{data.phone}</span></p>
                            </div>
                            <div className='overflow-x-auto mt-6'>
                                <table className='table-auto w-full border-collapse border border-gray-400'>
                                    <thead>
                                        <tr className='bg-gray-200'>
                                            <th className='border border-gray-400 px-4 py-2'>Product</th>
                                            <th className='border border-gray-400 px-4 py-2'>Quantity</th>
                                            <th className='border border-gray-400 px-4 py-2'>Gst</th>
                                            <th className='border border-gray-400 px-4 py-2'>Price</th>
                                            <th className='border border-gray-400 px-4 py-2'>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.items?.map((item) => (
                                            <tr key={item._id}>
                                                <td className='border border-gray-400 px-4 py-2'>{item.name}</td>
                                                <td className='border border-gray-400 px-4 py-2'>{item.qty}</td>
                                                <td className='border border-gray-400 px-4 py-2'>{item.gst}</td>
                                                <td className='border border-gray-400 px-4 py-2'>₹{item.price}</td>
                                                <td className='border border-gray-400 px-4 py-2'>₹{item.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='mt-6 space-y-2 text-right'>
                                <p>Total Amount - {data.totalAmount}</p>
                                <p>Total Amount with gst - {data.totalAmount * 0.18 + data.totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
