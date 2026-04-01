import React, { useContext } from 'react'
import { BillQuoteContext } from '../pages/service/SerDash'

export const ServiceQuote = () => {

    const { togQuote, togglequote, quote, openQuote, toggleOpenQuote, data } = useContext(BillQuoteContext)

    return (
        <div>    <div>

            {togQuote &&
                <div className='fixed   transition inset-0 bg-opacity-50  bg-black/65 flex items-center justify-center'>
                    <div className='h-screen relative  bg-white w-full p-4 m-15 '>
                        <button onClick={togglequote} className='absolute top-4 hover:bg-red-400 px-3 rounded-2xl py-1 hover:text-white font-semibold  right-5'>x</button>

                        <h2 className=' text-center font-semibold  mt-10 text-lg'> Quotation List</h2>





                        <table className="table-auto mt-5 border-collapse border border-gray-400 w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-400 px-4 py-2">Customer Name</th>
                                    <th className="border border-gray-400 px-4 py-2">Phone</th>
                                    <th className="border border-gray-400 px-4 py-2">Created By</th>
                                    <th className="border border-gray-400 px-4 py-2">Total Amount</th>
                                    <th className="border border-gray-400 px-4 py-2">Date</th>
                                    <th className="border border-gray-400 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {quote.map((item) => (
                                    <tr key={item._id}>
                                        <td className="border border-gray-400 px-4 py-2">{item.customerName}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.phone}</td>
                                        <td className="border border-gray-400 px-4 py-2">{item.createdBy.name}</td>
                                        <td className="border border-gray-400 px-4 py-2">₹{item.totalAmount}</td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="border
                                                 border-gray-400 
                                                 px-4 py-2" onClick={() => toggleOpenQuote(item._id)} ><button className='bg-blue-600 px-4 py-1 rounded text-white hover:bg-blue-500'>open</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>



                </div>}


        </div>

            <div>

                {openQuote && <div className='fixed   transition inset-0 bg-opacity-50  bg-black/65 flex items-center justify-center'   >

                    <div className='relative bg-white h-auto w-auto'>
                        <button onClick={toggleOpenQuote} className='absolute top-4 hover:bg-red-400 px-3 rounded-2xl py-1 hover:text-white font-semibold  right-5'>x</button>


                        <div className='b-white p-10 overflow-auto'>
                            <h2 className='text-center text-2xl font-semibold'>Quotation</h2>

                            <span className='text-lg font-semibold flex gap-10 ' >
                                Customer Name :
                                <span className='font-normal'>
                                    {data.customerName}
                                </span>
                            </span>
                            <span className='text-lg font-semibold flex gap-10 ' >
                                Customer Phone :
                                <span className='font-normal'>
                                    {data.phone}
                                </span>
                            </span>

                            <table className="table-auto mt-6 border-collapse border border-gray-400 w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-400 px-4 py-2">Product</th>
                                        <th className="border border-gray-400 px-4 py-2">Quantity</th>
                                        <th className="border border-gray-400 px-4 py-2">Gst</th>
                                        <th className="border border-gray-400 px-4 py-2">Price</th>
                                        <th className="border border-gray-400 px-4 py-2"> Total</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map((item) => (
                                        <tr key={item._id}>
                                            <td className="border border-gray-400 px-4 py-2">{item.name}</td>
                                            <td className="border border-gray-400 px-4 py-2">{item.qty}</td>
                                            <td className="border border-gray-400 px-4 py-2">{item.gst}</td>
                                            <td className="border border-gray-400 px-4 py-2">₹{item.price}</td>
                                            <td className="border border-gray-400 px-4 py-2">₹{item.total}</td>


                                        </tr>

                                    ))}







                                </tbody>
                            </table>
                            <div className='flex flex-col text-end'>

                                <span className='p-2'>Total Amount - {data.totalAmount}</span>
                                <span className='p-2'>Total Amount with gst -{data.totalAmount * 18}</span>

                            </div>
                        </div>


                    </div>


                </div>}

            </div>

        </div>
    )
}
