import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'


export const Adminsidebar = () => {
    return (
        <div className='bg-gray-700 h-screen  '>
            <div className=''>
                <span className='flex '><img className='h-15 ml-5  mt-20 animate-spin' src={logo} alt="" /> <h2 className='pl-5 mt-21 text-xl font-bold text-white'>Wind Camera Service</h2></span>
            </div>
            <div className='ml-6 mt-20 font-semibold text-xl text-white leading-11  '>
                <ul>
                    <li className='transition-all duration-200 hover:scale-105 hover:ml-5  hover:shadow-2xl'>
                        <Link
                            className="block 
                          px-4 py-2 text-white
                           hover:bg-gray-600 rounded"
                            to="dash"> Dashborad</Link>
                    </li>
                    <li className='transition-all duration-200 hover:scale-105 hover:ml-5  hover:shadow-2xl'>

                        <Link className="block px-4 py-2 text-white hover:bg-gray-600 rounded" to="Serviceman" > Service Man</Link>
                    </li>
                    <li className='transition-all duration-200 hover:scale-105 hover:ml-5  hover:shadow-2xl'>
                        <Link className="block px-4 py-2 text-white hover:bg-gray-600 rounded" to="Bill" > Bills</Link>
                    </li>
                    <li className='transition-all duration-200 hover:scale-105 hover:ml-5  hover:shadow-2xl'>
                        <Link className="block px-4 py-2 text-white hover:bg-gray-600 rounded" to="Quate"> Quatation</Link>
                    </li>
                    <li className='transition-all duration-200 hover:scale-105 hover:ml-5  hover:shadow-2xl'>
                        <Link className="block px-4 py-2 text-white hover:bg-gray-600 rounded" to="Inventery"> Inventary</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}
