
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import api from '../Api/Api'

export const SerNav = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const userid = JSON.parse(localStorage.getItem("User"))


  const logout = async () => {
    const user = JSON.parse(localStorage.getItem("User"))
    try {
      const res = await api.post("/ServiceMan-logout", user)
    } catch (error) {
      console.log(error.response.data.message);

    }


    localStorage.removeItem("ServiceAccessToken")
    localStorage.removeItem("User")
    navigate("/")
  }


  return (
    <div className='flex justify-around bg-gray-400 p-4 text-lg text-white font-semibold '>


      <div className='flex gap-9 items-center'>
        <img src={logo} className='h-10 animate-spin transition-all  ' alt="" />

        <h2>
          Welcome {user?.name}
        </h2>
      </div>

      <div className='flex gap-6 items-center' >

        <Link to="Home" >
          <button>Home</button>
        </Link>
        <Link to="Bills" >
          <button> Create Bill</button>
        </Link>
        <Link to="Quotation" >
          <button > Create Quotation</button>
        </Link>

        <button onClick={logout}>Logout</button>

      </div>

    </div>
  )
}
