import React from 'react'
import cam from '../../assets/cam.jpeg'
import { Link } from 'react-router-dom'

export const LoadingPage = () => {
    return (
        <div className='h-screen'>


            <div className='md:flex justify-center h-screen items-center p-10 '>
                <div className=' h-70 md:h-70 md:w-130 bg-center bg-cover bg-no-repeat rounded-t-2xl md:rounded-l-2xl md:rounded-none'
                    style={{ backgroundImage: `url(${cam})` }}>

                </div>

                <div className=' h-70   md:h-70 md:w-65 border rounded-b-2xl md:rounded-r-2xl md:rounded-b-none flex justify-center items-center flex-col '>

                    <Link to="/AdminLogin">

                        <button className='px-6 py-2 cursor-pointer font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-lg '>Admin  </button>
                    </Link>

                    <Link to="/ServiceLogin">

                        <button className='px-6 py-2 border cursor-pointer font-bold text-white bg-blue-700 hover:bg-blue-600 rounded-lg mt-4'>service </button>
                    </Link>

                </div>
            </div>


        </div>
    )
}
