import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { LoadingPage } from './pages/Admin/LoadingPage'
import { AdminLogin } from './pages/Admin/AdminLogin'
import { AdminDash } from './pages/Admin/AdminDash'
import { Serviceman } from './pages/Admin/Serviceman'
import { Bill } from './pages/Admin/Bill'
import { Quate } from './pages/Admin/Quate'
import { Adash } from './pages/Admin/Adash'
import { Inventery } from './pages/Admin/Inventery'
import { ServiceLogin } from './pages/service/ServiceLogin'
import { SerDash } from './pages/service/SerDash'
import { Sermain } from './pages/service/Sermain'
import { SerBill } from './pages/service/SerBill'
import { SerQuotej } from './pages/service/SerQuotej'


const App = () => {
  return (
    <div className='h-screen'>

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<LoadingPage />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/ServiceLogin' element={<ServiceLogin />} />


          <Route path='/Admin' element={<AdminDash />} >


            <Route index element={<Adash />} />
            <Route path='dash' element={<Adash />} />
            <Route path='Serviceman' element={<Serviceman />} />
            <Route path='Bill' element={<Bill />} />
            <Route path='Quate' element={<Quate />} />
            <Route path='Inventery' element={<Inventery />} />
          </Route>

          <Route path='/Service' element={<Sermain />} >

            <Route index element={<SerDash />} />
            <Route path='Home' element={<SerDash />} />
            <Route path='Bills' element={<SerBill />} />
            <Route path='Quotation' element={<SerQuotej />} />


          </Route>



        </Routes>


      </BrowserRouter>

    </div>
  )
}

export default App