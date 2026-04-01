import React from 'react'
import { Outlet } from 'react-router-dom'
import { Adminsidebar } from '../components/Adminsidebar'
import { Navbar } from '../components/Navbar'


export const AdminLayout = () => {
    return (
        <div className='flex h-screen'>
            <aside className='w-64  fixed'>
                <Adminsidebar />
            </aside>
            <div className='ml-64 flex-1 overflow-y-auto'>

                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}
