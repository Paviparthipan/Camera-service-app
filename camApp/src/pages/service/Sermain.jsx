import React, {  useEffect } from 'react'
import { SerLayout } from '../../layout/SerLayout'
import useIdelLogout from '../../CustHooks/AutoLogout'
import { useNavigate } from 'react-router-dom'


export const Sermain = () => {
  const navigate = useNavigate()
  useIdelLogout()

  useEffect(() => {
    const token = localStorage.getItem("ServiceAccessToken")
    if (!token) {
      navigate("/")
    }
    if (token === "undefined") {
      navigate("/")
    }

  }, [])







  return (
    <div>
      <SerLayout />
    </div>
  )
}
