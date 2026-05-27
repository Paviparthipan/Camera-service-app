
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import api from '../Api/Api'

export const SerNav = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const logout = async () => {
    const user = JSON.parse(localStorage.getItem("User"))
    try {
      await api.post("/ServiceMan-logout", user)
    } catch (error) {
      console.log(error.response?.data?.message)
    }

    localStorage.removeItem("ServiceAccessToken")
    localStorage.removeItem("User")
    navigate("/")
  }

  return (
    <div className='bg-gray-400 text-white'>
      <div className='mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4'>
        <div className='flex items-center gap-3'>
          <img src={logo} className='h-10 animate-spin' alt="" />
          <span className='font-semibold'>Welcome {user?.name}</span>
        </div>

        <button onClick={() => setMenuOpen(prev => !prev)} className='md:hidden rounded bg-gray-500 px-3 py-2 text-sm font-semibold hover:bg-gray-600'>Menu</button>

        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <div className='flex flex-col gap-3 rounded bg-gray-500/20 p-4 md:flex-row md:p-0 md:bg-transparent'>
            <Link to="Home" onClick={() => setMenuOpen(false)} className='block rounded px-3 py-2 text-left hover:bg-gray-600 md:text-white md:hover:bg-transparent'>Home</Link>
            <Link to="Bills" onClick={() => setMenuOpen(false)} className='block rounded px-3 py-2 text-left hover:bg-gray-600 md:text-white md:hover:bg-transparent'>Create Bill</Link>
            <Link to="Quotation" onClick={() => setMenuOpen(false)} className='block rounded px-3 py-2 text-left hover:bg-gray-600 md:text-white md:hover:bg-transparent'>Create Quotation</Link>
            <button onClick={logout} className='rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700 md:ml-2'>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}
