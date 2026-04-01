import React, { useEffect, useState } from 'react'
import api from '../../Api/Api'
import logo from '../../assets/bill.png'


export const Quate = () => {
  const [quote, setQuote] = useState([])
  const [data, setData] = useState([])
  const [togQuote, setTogQuote] = useState(false)

  useEffect(() => {

    const fetchQuote = async () => {
      try {
        const res = await api.get("/all-quote")
        setQuote(res.data)


      } catch (error) {
        console.log(error.response.data.message);

      }
    }
    fetchQuote()
  }, [])


  const loadQuote = (id) => {
    setTogQuote(prev => !prev)


    setData(quote.find((b) => b._id === id))

  }


  const delQuote = async (id) => {

    try {

      setQuote(quote.filter((q) => q._id !== id))
      const res = await api.delete(`/delete-quote?id=${id}`)

    } catch (error) {
      console.log(error.response.data.error);

    }


  }




  return (
    <div>
      <div className='flex gap-5 pl-15 mt-5 items-center '>
        <img src={logo} alt="" />
        <span>

          <p className='text-2xl font-semibold'>QUOTATION</p>
          <p>Manage Your Quotation</p>
        </span>
      </div>
      <div>

        <ul>
          {quote.map((item, index) => (
            <li className='flex justify-between mx-20 border py-3 mt-5 border-l-4 text-lg rounded-sm  p-2' key={item._id}>

              <span>
                {index + 1}.
              </span>

              <span>
                Cust.name : {item.customerName}
              </span>
              <span>
                Quotation Amount: {item.totalAmount}
              </span>
              <span>
                Created By : {item.createdBy.name}
              </span>

              <span>
                Date: {new Date(item.createdAt).toLocaleDateString()}
              </span>

              <button onClick={() => loadQuote(item._id)} className='bg-blue-600 hover:bg-blue-500 px-3 py-1 text-white rounded-sm'>open</button>
              <button onClick={() => delQuote(item._id)} className='bg-red-600 hover:bg-red-400 px-3 py-1 text-white rounded-sm'>Remove</button>

            </li>
          ))}
        </ul>
      </div>


      <div>

        {togQuote &&
          <div className='fixed  rounded-lg transition inset-0 bg-opacity-50  bg-black/65 flex items-center justify-center'>

            <div className='bg-white p-25 relative'>
              <button onClick={loadQuote} className='absolute top-5 right-7 w-7 hover:bg-red-500 rounded-2xl  hover:text-white text-2xl'>x</button>


              <div >

                <h2 className='text-2xl font-semibold text-center'>Quotation</h2>
                <div className='flex justify-between'>

                  <div>
                    <p className='text-lg'>Customer Name: {data.customerName}</p>
                    <p className='text-lg'>Phone: {data.phone}</p>

                  </div>

                  <div>
                    <p className='text-lg'>Staff Name: {data.createdBy.name} </p>
                  </div>
                </div>

                <table className='mt-9'>

                  <thead>
                    <tr className='bg-gray-200'>
                      <th className="border border-gray-400 px-4 py-2">Name</th>
                      <th className="border border-gray-400 px-4 py-2">Quantity</th>
                      <th className="border border-gray-400 px-4 py-2">Gst</th>
                      <th className="border border-gray-400 px-4 py-2">Price</th>
                      <th className="border border-gray-400 px-4 py-2">Total Amount</th>
                    </tr>
                  </thead>

                  <tbody>

                    {
                      data.items.map((p) => (


                        <tr key={p._id}>

                          <td className="border border-gray-400 px-4 py-2">{p.name}</td>
                          <td className="border border-gray-400 px-4 py-2">{p.qty}</td>
                          <td className="border border-gray-400 px-4 py-2">{p.gst}%</td>
                          <td className="border border-gray-400 px-4 py-2">₹{p.price}</td>
                          <td className="border border-gray-400 px-4 py-2">₹{p.total}</td>
                        </tr>
                      ))
                    }
                  </tbody>

                </table>

                <p className='text-end'>Total : ₹{data.totalAmount}  </p>
                <p className='text-end'>
                  Total With Gst : ₹{data.totalAmount * 18}
                </p>
              </div>

            </div>


          </div>
        }
      </div>




    </div>
  )
}
