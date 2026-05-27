import React from 'react'
import { useState } from 'react'
import api from '../../Api/Api'
import { useEffect, createContext } from 'react'
import { ServiceBill } from '../../components/ServiceBill'
import { ServiceQuote } from '../../components/ServiceQuote'
export const BillQuoteContext = createContext()

export const SerDash = () => {

    const [quote, setQuote] = useState([])
    const [bills, setBills] = useState([])
    const [togQuote, setTogQuote] = useState(false)
    const [togBill, setTogBill] = useState(false)
    const [openBill, setOpenBill] = useState(false)
    const [openQuote, setOpenQuote] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {

        const getQuote = async () => {

            try {
                const user = JSON.parse(localStorage.getItem("User"))

                const quote = await api.get(`/quote-list?UserId=${user.id}`)

                const bill = await api.get(`/get-bill?UserId=${user.id}`)
                setQuote(quote.data);
                setBills(bill.data)
            } catch (error) {
                console.log(error);

            }

        }

        getQuote()
    }, [])

    const togglequote = () => {
        setTogQuote(prev => !prev)

    }



    const togglebill = () => {
        setTogBill(prev => !prev)

    }

    const toggleOPenBill = (id) => {
        setOpenBill(prev => !prev)
        setData(bills.find((item) => item._id === id))



    }

    const toggleOpenQuote = (id) => {
        setOpenQuote(prev => !prev)
        setData(quote.find((item) => item._id === id))
    }




    const bt = bills.map((b) => (b.totalAmount))
    const qt = quote.map((q) => q.totalAmount)



    return (


        <BillQuoteContext.Provider value={{
            togBill,
            togglebill,
            bills,
            toggleOPenBill,
            data,
            openBill,
            togQuote,
            togglequote,
            quote,
            openQuote,
            toggleOpenQuote
        }}>



            <div className='min-h-screen bg-gray-100 px-4 py-10'>

                <div>


                    <div className='mx-auto grid max-w-7xl gap-6 pt-20 text-lg lg:grid-cols-4'>
                        <div className='rounded-lg bg-white p-5 shadow-2xl text-center'>
                            <p className='mt-5 text-xl font-semibold '>Total bills</p>
                            <p>

                                {bills.length}

                            </p>
                            <p className='mt-5 text-xl font-semibold'>Total Bill Amount</p>
                            <p>
                                ₹ {bt.reduce((a, b) => a + b, 0)}

                            </p>

                        </div>
                        <div className='rounded-lg bg-white p-5 shadow-2xl text-center'>
                            <p className='mt-5 text-xl font-semibold'>
                                Total quotations
                            </p>
                            <p>
                                {quote.length}
                            </p>
                            <p className='mt-5 text-xl font-semibold'>Total Quotation Amount</p>

                            ₹ {qt.reduce((a, b) => a + b, 0)}
                        </div>
                        <div className='rounded-lg bg-white p-5 shadow-2xl text-center'>
                            <p className='mt-10 text-xl font-semibold'>
                                Click to see bill
                            </p>
                            <button onClick={togglebill} className='
                            cursor-pointer hover:bg-blue-500
                             bg-blue-600 px-4 py-1 rounded mt-10 text-white'>click</button>
                        </div>
                        <div className='rounded-lg bg-white p-5 shadow-2xl text-center'>
                            <p className='mt-10 text-xl font-semibold'>
                                Click to see Quotation
                            </p>
                            <button onClick={togglequote} className=' 
                            cursor-pointer hover:bg-blue-500 bg-blue-600 px-4
                             py-1 rounded mt-10 text-white'>click</button>

                        </div>
                    </div>

                    <div>
                        <h3 className='mt-5 bg-gray-400 p-3 text-center text-lg  font-semibold'>Recent Activities</h3>

                    </div>

                    <ul className='space-y-3'>
                        {[...quote.slice(-3)].reverse().map((item) => (
                            <li key={item._id} className='flex flex-col gap-2 rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
                                <span className='font-semibold'>Cust-Name: {item.customerName}</span>
                                <span>Cust-num: {item.phone}</span>
                                <span>CreatedBy: {item.createdBy.name}</span>
                                <span>Total Quote amount: ₹{item.totalAmount}</span>
                            </li>
                        ))}
                    </ul>
                    <ul className='space-y-3'>
                        {[...bills.slice(-3)].reverse().map((item) => (
                            <li key={item._id} className='flex flex-col gap-2 rounded-lg border-l-4 border-green-500 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
                                <span className='font-semibold'>Cust-Name: {item.customerName}</span>
                                <span>Cust-num: {item.phone}</span>
                                <span>CreatedBy: {item.createdBy.name}</span>
                                <span>Total Bill amount: ₹{item.totalAmount}</span>
                            </li>
                        ))}
                    </ul>

                </div>

                <ServiceBill />


                <ServiceQuote />




            </div>
        </BillQuoteContext.Provider>
    )
}
