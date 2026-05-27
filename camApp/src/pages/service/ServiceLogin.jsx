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
    <div className='h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center px-4'
      style={{ backgroundImage: `url(${bg})` }}>

      <div className='w-full max-w-md rounded-xl bg-black/60 p-8 text-white shadow-2xl'>
        <h2 className='text-3xl font-semibold'>Service Login</h2>
        <form action="" onSubmit={login} className='mt-6 space-y-4'>
          <input type="text"
            name='userName'
            value={formData.userName}
            onChange={handleChange}
            placeholder='Enter user name'
            className='w-full rounded border bg-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300' />
          <input type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter password'
            className='w-full rounded border bg-white/10 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300' />
          <p className='text-lg text-red-300'>{message}</p>
          <button type='submit' className='w-full rounded-sm bg-blue-700 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-600'>LogIn</button>
        </form>
      </div>
    </div>





  )
}
