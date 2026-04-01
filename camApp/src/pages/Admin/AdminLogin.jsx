import React from 'react'
import api from '../../Api/Api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import bg from '../../assets/bg.jpg'
export const AdminLogin = () => {

    const navigate = useNavigate()
    const [userinp, setUserinp] = useState({
        userName: "",
        password: ""
    })
    const [message, setMessage] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserinp((prev) => ({
            ...prev, [name]: value
        }))
    }


    const login = async (e) => {

        e.preventDefault();
        try {
            if (userinp.userName.trim() === "" || userinp.password.trim() === "") {

                setMessage("Fill all credentials")
                return
            }
            const res = await api.post("/admin/login", userinp);
            localStorage.setItem("accessToken", res.data.accessToken)
            localStorage.setItem("refreshToken", res.data.refreshToken)


            navigate("/Admin")
            setUserinp({
                userName: "",
                password: ""
            })



        } catch (error) {


            setMessage(error.response?.data?.message);


        }


    }

    return (
        <div className='h-screen bg-no-repeat bg-cover  bg-center  bg-gray-300 flex justify-center items-center'
         style={{backgroundImage : `url(${bg})`}}>

            <div className='w-100 text-center  shadow-2xl bg-black/50  md:min-w-2/5 p-15 rounded-lg h-100 '>

                <h2 className='text-white '>Admin Login</h2>

                <form action="" className='mt-5 ' onSubmit={login}>
                    <div className='relative'>
                        <input type="text"
                            name="userName"
                            value={userinp.userName}
                            onChange={handleChange}
                            id="uname"
                            placeholder='Admin '
                            className=' w-full text-white border px-4 py-3 peer focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <label htmlFor="uname"
                            className='absolute left-4 top-2
                        text-gray-500 transition-all
                        peer-placeholder-shown:top-2 
                        peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:text-base
                        peer-focus:top-0
                        peer-focus:text-sm
                        peer-focus:text-blue-600
              
                     peer-valid:text-sm
                       peer-valid:top-0
                    
                    
                    '>User name</label>


                    </div>

                    <div className='relative'>


                        <input type="text"
                            name="password"
                            value={userinp.password}
                            onChange={handleChange}
                            id="pwd"
                            placeholder=' Admin@123'
                            className=' w-full text-white border px-4 py-3 peer focus:outline-none focus:ring-2 mt-7 focus:ring-blue-500' />

                        <label htmlFor="pwd" className='absolute left-4 top-9
                        text-gray-500 transition-all
                        peer-placeholder-shown:top-9
                        peer-placeholder-shown:text-gray-400
                        peer-placeholder-shown:text-base
                        peer-focus:top-7
                        peer-focus:text-sm
                        peer-focus:text-blue-600
                       peer-valid:text-sm
                       peer-valid:top-7
                         '>Password</label>
                    </div>

                    <p className='text-start mt-4 text-red-600 '>{message}</p>

                    <button type='submit' className='rounded-sm text-white hover:bg-blue-600 mt-5 bg-blue-800 px-5 py-1'>Log in</button>
                </form>
            </div>


        </div>
    )
}
