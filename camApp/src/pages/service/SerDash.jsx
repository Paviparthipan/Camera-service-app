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



            <div className=' h-screen  bg-gray-100 '>


                <div>


                    <div className='flex gap-20 justify-center pt-20 text-lg flex-wrap '>
                        <div className='bg-white rounded-lg h-50 shadow-2xl w-50 text-center '>
                            <p className='mt-5 text-xl font-semibold '>Total bills</p>
                            <p>

                                {bills.length}

                            </p>
                            <p className='mt-5 text-xl font-semibold'>Total Bill Amount</p>
                            <p>
                               ₹ {bt.reduce((a, b) => a + b, 0)}

                            </p>

                        </div>
                        <div className='bg-white rounded-lg h-50 shadow-2xl w-50 text-center '>
                            <p className='mt-5 text-xl font-semibold'>
                                Total quotations
                            </p>
                            <p>
                                {quote.length}
                            </p>
                            <p className='mt-5 text-xl font-semibold'>Total Quotation Amount</p>

                           ₹ {qt.reduce((a, b) => a + b, 0)}
                        </div>
                        <div className='bg-white rounded-lg h-50 shadow-2xl w-50 text-center '>
                            <p className='mt-10 text-xl font-semibold'>
                                Click to see bill
                            </p>
                            <button onClick={togglebill} className='
                            cursor-pointer hover:bg-blue-500
                             bg-blue-600 px-4 py-1 rounded mt-10 text-white'>click</button>
                        </div>
                        <div className='bg-white rounded-lg h-50 shadow-2xl w-50 text-center '>
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

                    <ul>
                        {[...quote.slice(-3)].reverse().map((item, index) => (
                            <li key={item._id} className='flex rounded-sm  cursor-pointer border-l-4 m-2  justify-around p-2 '>

                                <span> Cust-Name {item.customerName} </span>
                                <span> Cust-num {item.phone} </span>
                                <span> CreatedBy {item.createdBy.name} </span>

                                <span>Total Quote amount - ₹{item.totalAmount} </span>

                            </li>
                        ))}

                    </ul>
                    <ul>
                        {[...bills.slice(-3)].reverse().map((item, index) => (
                            <li key={item._id} className='flex rounded-sm  cursor-pointer border-l-4 m-2  justify-around p-2 '>


                                <span> Cust-Name {item.customerName} </span>
                                <span> Cust-num {item.phone} </span>
                                <span> CreatedBy {item.createdBy.name} </span>

                                <span>Total Bill amount - ₹{item.totalAmount} </span>

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
