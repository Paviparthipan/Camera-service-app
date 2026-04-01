import React, { useContext, useState } from 'react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    CartesianGrid
} from "recharts"
import { serviceContext } from './AdminDash'
import billlogo from '../../assets/bill2.png'
import techlogo from '../../assets/tech.png'
import revenuelogo from '../../assets/revenue.png'

export const Adash = () => {

    const { serviceManList, bill, quote } = useContext(serviceContext)





    const result = {}

    bill.forEach((b) => {

        const date = new Date(b.createdAt);
        const month = date.toDateString("default", { month: "short", year: "numaric" });

        if (!result[month]) {
            result[month] = 0;

        }
        result[month] += b.totalAmount
    });


    const chartData = Object.keys(result).map((month) => ({
        month,
        total: result[month]
    }))

    const totalBillAmt = bill.map((p) => (p.totalAmount));
    const totalQuoteAmt = quote.map((p) => (p.totalAmount));


    const TotalBill = totalBillAmt.reduce((a, b) => a + b, 0)
    const TotalQuote = totalQuoteAmt.reduce((a, b) => a + b, 0)

    const pieData = [
        { name: "Bills", value: TotalBill },
        { name: "Quote", value: TotalQuote }
    ]


    return (
        <div className='  h-screen '>

            <div className='flex flex-wrap justify-center gap-20 mt-20'>

                <div className='h-20  w-45 shadow-2xl flex items-center gap-4 '>
                    <div className='bg-blue-600 rounded-l-lg p-5 h-full'>

                        <img src={techlogo} className='' alt="" />
                    </div>

                    <div className='text-center  text-lg font-semibold '>
                        <span>Total Technicians</span>
                        <p>{serviceManList.length}</p>
                    </div>

                </div>
                <div className='h-20  w-45 shadow-2xl flex items-center gap-4 '>
                    <div className='bg-blue-600 rounded-l-lg p-5 h-full'>

                        <img src={billlogo} className='h-8' alt="" />
                    </div>

                    <div className='text-center  text-lg font-semibold '>
                        <span>Total Bills</span>
                        <p>{bill.length}</p>
                    </div>

                </div>
                <div className='h-20  w-45 shadow-2xl flex items-center gap-4 '>
                    <div className='bg-blue-600 rounded-l-lg p-5 h-full'>

                        <img src={billlogo} className='h-8' alt="" />
                    </div>

                    <div className='text-center  text-lg font-semibold '>
                        <span>Total Quotation</span>
                        <p>{quote.length}</p>
                    </div>

                </div>
                <div className='h-20  w-45 shadow-2xl flex items-center gap-4 '>
                    <div className='bg-blue-600 rounded-l-lg p-5 h-full'>

                        <img src={revenuelogo} className='h-8' alt="" />
                    </div>

                    <div className='text-center  text-lg font-semibold '>
                        <span>Total Revenue</span>
                        <p>₹{TotalBill}</p>
                    </div>

                </div>


            </div>

            <div className='flex gap-25 justify-center flex-wrap mt-15 ' >

                <div>

                    <h2 className='text-xl font-semibold'>Monthly Revenue</h2>
                    <BarChart className='mt-10' width={250} height={300} data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="total" fill='green' />
                    </BarChart>

                </div>
                <div>
                    <h2 className='text-xl font-semibold'>Bill vs Quotation</h2>
                    <BarChart className='mt-10' width={250} height={300} data={pieData}  >

                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill='blue' />
                    </BarChart>



                </div>




            </div>



        </div>
    )
}
