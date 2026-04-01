import React, { useEffect, useState } from 'react'
import api from '../../Api/Api'



export const SerQuotej = () => {

  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState("")
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    customerName: "",
    phone: ""
  })
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get("/productList")
        setProducts(res.data.product);

        const uniqueCategory = [...new Set(res.data.product.map((p) => p.category))]
        setCategory(uniqueCategory)
      } catch (err) {
        console.log(err.response?.data?.message);
      }
    }
    fetchProduct()
  }, [])

  const handleCategory = async (e) => {


    const c = e.target.value
    setSelectedCategory(c)

    try {
      const res = await api.get(`/productList?category=${c}`)
      setProducts(res.data.product)

    } catch (error) {
      console.log(error.response?.data?.message);

    }



  }

  const filterProduct = products.filter((p) => {

    const value = filterProducts.toLowerCase();

    return (
      p.name.toLowerCase().includes(value) ||
      p.brand.toLowerCase().includes(value)

    )


  })


  const addCart = (p) => {



    const exist = cart.find((item) => item._id === p._id)


    if (exist) {
      const updateCart = cart.map((item) =>
        item._id === p._id ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price }
          : item
      );
      setCart(updateCart)
    } else {
      setCart([...cart, { ...p, qty: 1, total: p.price }])
    }

  }

  const totalAmount = cart.reduce((a, item) => a + item.total, 0)



  const removeCart = (id) => {
    const exist = cart.find((item) => item._id === id);

    if (exist.qty === 1) {
      setCart(cart.filter((item) => item._id !== id))

    } else {
      setCart(cart.map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1, total: (item.qty - 1) * item.price } : item
      ))
    }





  }

  const toggleCart = () => {

    setShowCart(prev => !prev)
    setFormData({
      customerName: "",
      phone: ""
    })

    setMessage("")

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value
    }))
  }
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      const totalAmount = cart.reduce((a, item) => a + item.total, 0)


      if (cart.length === 0) {
        setMessage("Cart is empty !!!")
        return
      }
      const user = JSON.parse(localStorage.getItem("User"))

      const data = {
        customerName: formData.customerName,
        phone: formData.phone,
        UserId: user.id,
        items: cart,
        totalAmount
      }

      const res = await api.post("/create-quote", data)

      alert("quotation added successfully")



    } catch (error) {
      console.log(error.response?.data?.message);

    }




    setShowCart(prev => !prev)

    setMessage("")
    setFormData({
      customerName: "",
      phone: ""
    })
    setCart([])
  }




  return (



    <div className=''>




      <div className='mt-5 flex mx-10 justify-between'>

        <select name="category" className='border p-2 rounded-sm '
          id="category"
          value={selectedCategory}
          onChange={handleCategory}>
          <option value="" disabled>
            select category
          </option>
          <option value="" >
            All Product
          </option>

          {category.map((c) => (
            <option value={c} key={c}>{c}</option>
          ))}


        </select>
<span>

        <input
          className='bg-gray-300 
          rounded-sm 
          px-4 py-2 
          w-95' type="text"
          value={filterProducts}
          onChange={(e) => setFilterProducts(e.target.value)}
          placeholder='Search Product' />

        <button className='bg-blue-600
         hover:bg-blue-500
         text-white px-3
         rounded cursor-pointer ml-3 py-2'
         
         onClick={toggleCart}
         
         >Show Cart</button>
         </span>

      </div>

      <div className='mt-10 m-5 '>

        {filterProduct.length === 0 ?

          <p>No products available</p>

          : (

            <ul className='flex flex-wrap gap-5'>
              {
                filterProduct.map((p) => (
                  <li className='border w-full flex justify-evenly p-3 rounded' key={p._id}>
                    <span>
                      <span className='font-semibold'>
                        Product name :
                      </span>   {p.name}
                    </span>
                    <span>
                      <span className='font-semibold'>

                        Brand:
                      </span>
                      {p.brand}
                    </span>
                    <span>
                      <span className='font-semibold'>

                        Price
                      </span>
                      {p.price}
                    </span>
                    <button
                      className='bg-blue-600 hover:bg-blue-500
                     py-1 px-3 rounded text-white cursor-pointer'
                      onClick={() => addCart(p)} >Add</button>

                  </li>
                ))
              }
            </ul>

          )}
      </div>

      {showCart &&


        <div className='fixed  overflow-y-scroll  transition inset-0 bg-opacity-50  bg-black/65 flex items-center justify-center' >


          <div className='bg-white relative p-10'>
            <button onClick={toggleCart} className=' text-lg font-semibold  rounded-2xl hover:bg-red-500 hover:text-white px-2 absolute top-0 right-5'>x</button>
            <h1 className='text-center mt-5 font-semibold text-xl'>Quotation List</h1>


            {cart.length === 0 ? <p className='text-center  mt-5 '>No item Added</p> : <div>





              <ul className='flex flex-col mt-4 gap-5'>
                {cart.map((item, index) => (
                  <li className='flex  text-center justify-around  '
                    key={item._id}>

                    <span>{index + 1}</span>

                    <span>

                      {item.name}
                    </span>
                    <span>
                      Qty {item.qty}
                    </span>

                    <span>

                      {item.gst}%
                    </span>
                    <span>

                      {item.price}
                    </span>

                    <button
                      className='bg-red-500 hover:bg-red-800
                     py-1 px-3 rounded text-white cursor-pointer'
                      onClick={() => removeCart(item._id)} >Remove</button>  </li>



                ))}
              </ul>

              <p className='text-end mr-39 mt-5 '>Total Amount - {totalAmount}</p>


            </div>}

            <form action="" onSubmit={handleSubmit} className='mt-10 text-center '>


              <input type="text"
                name='customerName'
                value={formData.customerName}
                onChange={handleChange}
                placeholder='Enter Customer Name'
                required
                className='px-4 py-2 rounded border w-full' />
              <input type="text" required
                value={formData.phone}
                onChange={handleChange}
                placeholder='Enter Customer Number'
                name="phone" id=""
                className='px-4 rounded mt-5 py-2 w-full border' />

              <p className='text-red-700 mt-5 font-semibold'>{message}</p>

              <button className='bg-blue-600 px-2 py-3 rounded mt-5 text-white'
                type='submit' > Add Quotation </button>
            </form>

          </div>


        </div>


      }


    </div >




  )
}
