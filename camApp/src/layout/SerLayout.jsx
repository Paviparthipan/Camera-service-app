import React from 'react'
import { SerNav } from '../components/SerNav'
import { Outlet } from 'react-router-dom'

export const SerLayout = () => {
    return (
        <div>
            <SerNav />
          
           
            <Outlet />
        </div>
    )
}
