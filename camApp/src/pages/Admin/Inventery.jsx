import React, { useEffect, useState } from 'react'
import api from '../../Api/Api'
import logo from '../../assets/in.png'


export const Inventery = () => {

    const [showForm, setShowForm] = useState(false)
    const [product, setProduct] = useState([])
    const [data, setData] = useState([])
    const [togData, setTogData] = useState(false)
    const [search, setSearch] = useState("")
    const togShowBtn = () => {
        setShowForm(prev => !prev)
        setFormData({
            name: "",
            brand: "",
            category: "",
            price: "",
            gst: ""
        })
    }
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "",
        price: "",
        gst: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev, [name]: value.trim()
        }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await api.post("/create-product", formData);

            setMessage(res.data?.message);
            setFormData({
                name: "",
                brand: "",
                category: "",
                price: "",
                gst: ""
            })


        } catch (error) {
            setMessage(error.response?.data?.message);

        }

    }


    useEffect(() => {
        const fetchProduct = async () => {

            try {

                const res = await api.get("/productList")

                setProduct(res.data.product);


            } catch (error) {
                console.log(error.response.data.message);

            }


        }
        fetchProduct()
    }, [])


    const togglebtn = (id) => {
        setTogData(prev => !prev)
        setData(product.find((p) => p._id === id))

    }

    const filterProducts = product.filter((p) => {
        const value = search.toLowerCase()
        return (

            p.name.toLowerCase().includes(value) ||
            p.brand.toLowerCase().includes(value)
        )


    })



    return (
        <div>
            <div className='flex gap-5 mt-5 pl-15 items-center '>
                <img src={logo} alt="" />
                <span>

                    <p className='text-2xl font-semibold'>INVENTERY</p>
                    <p>Manage Your Inventery</p>
                </span>
            </div>
                <div className=' mt-10 ml-20'>
                    <input type="text" 
                    name="search" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                     id="" placeholder='Search products'
                      className=' px-5 py-2 rounded-sm  border w-80' />
                    <button className='  bg-green-700
                     mt-10 ml-1 px-5 py-2 rounded
                      text-white hover:bg-green-600
                       cursor-pointer'
                        onClick={togShowBtn}>Add Product</button>
                </div>
            <div className=' flex flex-col justify-center items-center  '>



                <div className={` w-100 rounded shadow-2xl  border mt-10  text-center p-5 transition-all duration-300 overflow-hidden 
                ${showForm ? "max-h-120 opacity-100" : "max-h-0 opacity-0"} `}>
                    <h2 className='font-semibold text-lg'> Add Products</h2>
                    <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} id=""
                            placeholder='Enter product Model'
                            className='border px-4 py-2 w-full ' />
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} id=""
                            placeholder='Enter product brand'
                            className='border px-4 py-2 w-full ' />
                        <input type="text" name="category" onChange={handleChange} value={formData.category} id=""
                            placeholder='Enter product category'
                            className='border  px-4 py-2 w-full ' />
                        <input type="number" name="price" onChange={handleChange} value={formData.price} id=""
                            placeholder='Enter product price'
                            className='border px-4 py-2 w-full ' />
                        <input type="number" name="gst" onChange={handleChange} value={formData.gst} id=""
                            placeholder='Enter product gst'
                            className='border px-4 py-2 w-full ' />
                        <p className='font-semibold text-lg text-center'> {message} </p>

                        <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-lg text-white cursor-pointer px-5 py-2 rounded-sm mt-5 '>add</button>
                    </form>
                </div>
            </div>



            <div>
                <div>
                    <p className='text-center mt-5 font-semibold text-2xl'>Inventery List</p>
                    <ul>
                        {filterProducts.map((p, index) => (
                            <li className='flex gap-5 py-2 border-l-4  border rounded-lg my-4 mx-20 justify-between ' key={p._id}>


                                <span className='ml-9'>{index + 1}</span>
                                <span className='text-center'>
                                    {p.name}
                                </span>
                                <span>
                                    ₹   {p.price}
                                </span>




                                <button className='mr-10 bg-green-700 hover:bg-green-600 text-white px-2 py-2 rounded' onClick={() => togglebtn(p._id)}> See Product details</button>

                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            <div>
                {togData && <div className='bg-black/65  inset-0  fixed'>

                    <div className=' h-screen flex  justify-center items-center'>


                        <div className=' p-10 relative leading-10 w-150 shadow-2xl rounded-lg bg-white' >
                            <button className='hover:bg-red-600 top-5 right-5 absolute text-2xl rounded-2xl w-7 hover:text-white' onClick={togglebtn}>x</button>
                            <h2 className='text-center mt-10 text-lg font-semibold'>
                                Product Detail
                            </h2>
                            <p className='mx-5 mt-10'>Product Name:
                                <span className='ml-4'>
                                    {data.name}
                                </span>
                            </p>
                            <p className='mx-5'>Product Category:
                                <span className='ml-4'>
                                    {data.category}
                                </span>
                            </p>
                            <p className='mx-5'>Product Brand:
                                <span className='ml-4'>

                                    {data.brand}
                                </span>
                            </p>
                            <p className='mx-5'>Product Price:
                                <span className='ml-4'>
                                    {data.price}
                                </span>
                            </p>
                            <p className='mx-5'>Product Gst:
                                <span className='ml-4'>
                                    {data.gst} %
                                </span>  </p>

                        </div>



                    </div>


                </div>}
            </div>

        </div>
    )
}
