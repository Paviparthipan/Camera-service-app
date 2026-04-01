import React from 'react'
import { useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/")

  }


  return (
    <div className='flex justify-around p-5 bg-gray-200'>
      <h3 className='font-semibold text-2xl '>
        Welcome Admin
      </h3>
      <div className='flex'>
        <button onClick={logout} className='cursor-pointer hover:bg-red-800 bg-red-500 px-4 text-white font-semibold rounded-sm'>Logout</button>
      </div>
    </div>
  )
}
