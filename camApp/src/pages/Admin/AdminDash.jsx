import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../Api/Api'
import { AdminLayout } from '../../layout/AdminLayout'
import useIdelLogout from '../../CustHooks/AutoLogout'

export const serviceContext = createContext()
export const AdminDash = () => {
    useIdelLogout()
    const navigate = useNavigate()

    const [serviceManList, setServiceManList] = useState([])
    const [bill, setBill] = useState([])
    const [quote, setQuote] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            try {
                const token = localStorage.getItem("accessToken");

                if (!token) {
                    navigate("/");
                    return
                }

                const res = await api.get("/serviceman-list")
                const bill = await api.get("/all-bill")
                const quote = await api.get("/all-quote")
                setServiceManList(res.data.data)
                setBill(bill.data)
                setQuote(quote.data)



            } catch (error) {
                console.log(error.response?.data?.message);

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate("/");

            }

        }

        fetchData()



    }, [])




    return (

        <serviceContext.Provider value={{
            serviceManList,
            setServiceManList,
            bill,
            quote
        }}>

            <AdminLayout />

        </serviceContext.Provider>






    )
}
