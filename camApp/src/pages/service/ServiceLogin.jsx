import React, { useState } from 'react'
import bg from '../../assets/5096160.jpg'
import api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'



export const ServiceLogin = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userName: "",
    password: ""
  })
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev, [name]: value
    }))
  }
  const login = async (e) => {
    e.preventDefault()
    try {

      const res = await api.post("/ServiceMan-login", formData)

      setMessage(res.data.message)



      const token = localStorage.setItem("ServiceAccessToken", res.data.token)
      const user = localStorage.setItem("User", JSON.stringify(res.data.userData))

      navigate("/Service")

    } catch (error) {

      setMessage(error.response?.data?.message)
    }


  }



  return (



    <div className='h-screen flex justify-center items-center bg-cover bg-no-repeat bg-center'
      style={{ backgroundImage: `url(${bg})` }}>

      <div className='p-20 text-center bg-black/50 min-h-110 text-white'>
        <h2>Service Login</h2>
        <form action="" onSubmit={login} className=' mt-5'>
          <input type="text"
            name='userName'
            value={formData.userName}
            onChange={handleChange}
            placeholder='Enter user name'
            className='w-85 px-5 py-4  rounded border' /> <br />
          <input type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
            className='w-85 px-5 py-4 mt-5 border rounded' /> <br />
          <p className='text-lg text-red-700 mt-2'>{message}</p>
          <button type='submit' className='mt-5 bg-blue-700 px-6 py-2  text-lg rounded-sm hover:bg-blue-600'>LogIn</button>
        </form>
      </div>


    </div>





  )
}
