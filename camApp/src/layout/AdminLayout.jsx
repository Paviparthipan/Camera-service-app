import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Adminsidebar } from '../components/Adminsidebar'
import { Navbar } from '../components/Navbar'

export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='min-h-screen md:flex'>
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-700 transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Adminsidebar onClose={() => setSidebarOpen(false)} />
            </aside>

            {sidebarOpen && <div className='fixed inset-0 z-20 bg-black/40 md:hidden' onClick={() => setSidebarOpen(false)} />}

            <div className='md:ml-64 flex-1 overflow-y-auto'>
                <Navbar onMenuClick={() => setSidebarOpen(prev => !prev)} />
                <Outlet />
            </div>
        </div>
    )
}
