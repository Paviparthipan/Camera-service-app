import React, { useEffect, useState } from 'react'
import api from '../../Api/Api'



export const SerBill = () => {

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
            setShowCart(prev => !prev)
            const res = await api.post("/create-bill", data)

            alert("bill added successfully")

        } catch (error) {
            console.log(error.response?.data?.message);

        }






        setMessage("")
        setFormData({
            customerName: "",
            phone: ""
        })
        setCart([])
    }




    return (



        <div className=''>




            <div className='mt-5 flex flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between'>

                <select name="category" className='w-full rounded-sm border p-2 md:w-auto '
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
                <span className='flex w-full flex-col gap-3 md:max-w-xl'>
                    <input
                        className='w-full rounded-sm bg-gray-300 px-4 py-2'
                        type="text"
                        value={filterProducts}
                        onChange={(e) => setFilterProducts(e.target.value)}
                        placeholder='Search Product' />

                    <button className='mt-2 rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-500 md:mt-0 md:ml-3'

                        onClick={toggleCart}

                    >Show Cart</button>
                </span>

            </div>

            <div className='mt-10 m-5'>
                {filterProduct.length === 0 ?
                    <p>No products available</p>
                    : (
                        <ul className='grid gap-4 md:grid-cols-2'>
                            {
                                filterProduct.map((p) => (
                                    <li className='flex flex-col gap-3 rounded border bg-white p-4 text-left sm:flex-row sm:items-center sm:justify-between' key={p._id}>
                                        <div>
                                            <p className='font-semibold'>Product name:</p>
                                            <p>{p.name}</p>
                                        </div>
                                        <div>
                                            <p className='font-semibold'>Brand:</p>
                                            <p>{p.brand}</p>
                                        </div>
                                        <div>
                                            <p className='font-semibold'>Price:</p>
                                            <p>{p.price}</p>
                                        </div>
                                        <button
                                            className='rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-500'
                                            onClick={() => addCart(p)} >Add</button>
                                    </li>
                                ))
                            }
                        </ul>

                    )}
            </div>

            {showCart &&


                <div className='fixed inset-0 z-40 overflow-y-auto bg-black/60 flex items-start justify-center py-10 px-4'>
                    <div className='relative w-full max-w-3xl rounded-2xl bg-white p-6'>
                        <button onClick={toggleCart} className=' text-lg font-semibold  rounded-2xl hover:bg-red-500 hover:text-white px-2 absolute top-0 right-5'>x</button>
                        <h1 className='text-center mt-5 font-semibold text-xl'>Quotation List</h1>


                        {cart.length === 0 ? <p className='text-center  mt-5 '>No item Added</p> : <div>





                            <ul className='flex flex-col gap-4 mt-4'>
                                {cart.map((item, index) => (
                                    <li className='flex flex-col gap-3 rounded-lg border p-3 text-left sm:flex-row sm:items-center sm:justify-between'
                                        key={item._id}>
                                        <span className='font-semibold'>{index + 1}. {item.name}</span>
                                        <span>Qty: {item.qty}</span>
                                        <span>GST: {item.gst}%</span>
                                        <span>Price: {item.price}</span>
                                        <button
                                            className='rounded bg-red-500 px-3 py-2 text-white hover:bg-red-800'
                                            onClick={() => removeCart(item._id)} >Remove</button>
                                    </li>



                                ))}
                            </ul>

                            <p className='mt-5 text-right'>Total Amount - {totalAmount}</p>

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
