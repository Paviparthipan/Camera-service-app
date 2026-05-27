import React from 'react'
import { useNavigate } from 'react-router-dom'
export const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/")
  }

  return (
    <div className='flex flex-col gap-3 bg-gray-200 p-4 md:flex-row md:items-center md:justify-between'>
      <div className='flex items-center justify-between gap-3'>
        <button type='button' onClick={onMenuClick} className='md:hidden rounded bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-400'>Menu</button>
        <h3 className='font-semibold text-xl md:text-2xl'>Welcome Admin</h3>
      </div>
      <div>
        <button onClick={logout} className='cursor-pointer rounded-sm bg-red-500 px-4 py-2 text-white font-semibold hover:bg-red-800'>Logout</button>
      </div>
    </div>
  )
}
