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
        <div className='min-h-screen px-4 py-10'>

            <div className='mx-auto flex max-w-7xl flex-wrap justify-center gap-6'>

                <div className='w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl'>
                    <div className='flex items-center gap-4'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600'>
                            <img src={techlogo} alt="" className='h-10' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500'>Total Technicians</p>
                            <p className='text-2xl font-semibold'>{serviceManList.length}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl'>
                    <div className='flex items-center gap-4'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600'>
                            <img src={billlogo} className='h-8' alt="" />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500'>Total Bills</p>
                            <p className='text-2xl font-semibold'>{bill.length}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl'>
                    <div className='flex items-center gap-4'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600'>
                            <img src={billlogo} className='h-8' alt="" />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500'>Total Quotation</p>
                            <p className='text-2xl font-semibold'>{quote.length}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl'>
                    <div className='flex items-center gap-4'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600'>
                            <img src={revenuelogo} className='h-8' alt="" />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500'>Total Revenue</p>
                            <p className='text-2xl font-semibold'>₹{TotalBill}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-auto mt-12 grid max-w-7xl gap-8 px-4 sm:grid-cols-1 lg:grid-cols-2'>

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
