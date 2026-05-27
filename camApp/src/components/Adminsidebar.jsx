import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export const Adminsidebar = ({ onClose }) => {
    return (
        <div className='h-full bg-gray-700 text-white'>
            <div className='flex items-center justify-between gap-4 p-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 animate-spin' src={logo} alt="" />
                    <h2 className='text-lg font-bold'>Wind Camera Service</h2>
                </div>
                <button onClick={onClose} className='md:hidden rounded bg-gray-600 px-3 py-2 text-sm font-semibold hover:bg-gray-500'>Close</button>
            </div>
            <nav className='space-y-2 px-4 pb-6'>
                <Link className='block rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-600' to='dash' onClick={onClose}>Dashboard</Link>
                <Link className='block rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-600' to='Serviceman' onClick={onClose}>Service Man</Link>
                <Link className='block rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-600' to='Bill' onClick={onClose}>Bills</Link>
                <Link className='block rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-600' to='Quate' onClick={onClose}>Quotation</Link>
                <Link className='block rounded bg-gray-800 px-4 py-2 text-white transition hover:bg-gray-600' to='Inventery' onClick={onClose}>Inventory</Link>
            </nav>
        </div>
    )
}
