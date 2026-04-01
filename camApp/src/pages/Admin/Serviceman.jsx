import React, { useContext, useState } from 'react'
import { serviceContext } from './AdminDash'
import edit from '../../assets/edit.png'
import trash from '../../assets/trash.png'
import api from '../../Api/Api'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/tech.png'
export const Serviceman = () => {
  const { serviceManList, setServiceManList } = useContext(serviceContext)
  const navigate = useNavigate()
  const [toggle, setToggle] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editId, serEditId] = useState(null)
  const [findUser, setFindUser] = useState("")
  const [formData, SetFormData] = useState({
    name: "",
    userName: "",
    position: "",
    userNum: "",
    password: ""

  })

  const handleChange = (e) => {
    const { name, value } = e.target
    SetFormData((prev) => ({

      ...prev, [name]: value
    })
    )

  }

  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {


      if (editMode) {

        const res = await api.put(`/edit-serviceman/${editId}`, formData)

      } else {

        const res = await api.post("/create-serviceman", formData)
        setMessage("Serviceman created successfully")

      }
      setToggle(false)

      alert(res.data.message)
      setEditMode(false)
      serEditId(null)
    } catch (error) {

      setMessage(error.response?.data?.message || "something went wrong")

    }




  }


  const showForm = () => {
    setToggle(prev => !prev)
    setMessage("")
    SetFormData({
      name: "",
      userName: "",
      position: "",
      userNum: "",
      password: ""
    })
  }
  const delServiceman = async (id) => {

    try {
      const res = await api.delete("/servicemanDelete", {
        data: { id }
      })
      alert("user revomed successfully")
      setServiceManList(prev => prev.filter(user => user._id !== id))
    } catch (error) {
      setMessage(error.response?.data?.message)
    }

  }


  const editServiceman = (id) => {
    const oldData = serviceManList.find((data) => data._id === id)
    if (!oldData) {
      alert("user not found")
      return
    }
    SetFormData(oldData)
    setToggle(true)
    serEditId(id)
    setEditMode(true)
  }

  const filterUser = serviceManList.filter((user) => {
    const value = findUser.toLowerCase();
    return (
      user.name.toLowerCase().includes(value) ||
      user.userName.toLowerCase().includes(value) ||
      user.userNum.toString().includes(value)
    )
  })



  return (
    <div className=' '>
<div className='leading-10 mt-5 flex gap-5 items-center ml-10'>
<img src={logo} alt="" />
<span>
  <h2 className='text-2xl font-semibold'>SERVICE MAN</h2>
  <p className='text-lg'>Manage your staff & technicians</p>

</span>

</div>
      <div className='mt-10 ml-10'>
        <input
          className='shadow-2xl
          py-1 rounded-sm  px-5
          border w-70'
          placeholder='search user'
          type="text"
          name=""
          id=""
          value={findUser}
          onChange={(e) => setFindUser(e.target.value)}
        />
        <button onClick={showForm} className='bg-lime-700 cursor-pointer hover:bg-lime-600 text-white px-3 py-1 ml-6 rounded'>Add Staff</button>
      </div>

      <div className='h-screen '>
        <div className='flex justify-between rounded-lg py-2 font-semibold mx-10 px-25 lg:px-15 my-5 bg-amber-400 '>
          <p className=' xl:px-40'>
            Name
          </p>
          <p>
            Contact
          </p>
          <p>Role</p>
          <p>Status</p>
          <p>Action</p>
        </div>
        {filterUser.length === 0 ? (<p className='text-center mt-10 font-semibold '>No users</p>) :

          (
            <ul>
              {filterUser.map((data, index) => (
                <li key={data._id} className={`flex mx-10 justify-around mt-5 py-2 font-semibold rounded-lg text-lg ${index % 2 === 0 ? 'bg-indigo-300/50' : 'bg-blue-100'}`}  >
                  <span>
                    {index + 1}
                  </span>
                  <span>
                    {data.name}
                  </span>
                  <span>

                    {data.userNum}
                  </span>
                  <span>

                    {data.position}
                  </span>
                  <span>

                    {data.active ? <p className=''>Online</p>  : <p>Ofline</p> }
                  </span>
                  <button onClick={() => editServiceman(data._id)}>
                    <img src={edit} alt="" />
                  </button>
                  <button onClick={() => delServiceman(data._id)}> <img src={trash} alt="" /></button>
                </li>
              ))}
            </ul>

          )}
      </div>

      {toggle &&

        <div className='fixed transition inset-0 bg-opacity-50  bg-black/65 flex items-center justify-center'>

          <div className='rounded relative shadow-lg p-9 bg-white'>
            <button className='cursor-pointer absolute top-2 right-5 text-2xl' onClick={showForm}>x</button>
            <h2 className='text-center text-lg font-semibold p-5'>Add User</h2>
            <form onSubmit={handleSubmit} action="" className='  w-100 h-100 items-center justify-between  flex flex-col'>
              <input type="text"
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Name'
                // required
                className='border px-4 py-2 w-75 rounded ' />

              <input type="text"
                // required

                name='userName'
                value={formData.userName}
                onChange={handleChange}
                placeholder='User name'
                className='border px-4 py-2 w-75 rounded ' />

              <input type="text"
                // required

                name='position'
                value={formData.position}
                onChange={handleChange}
                placeholder='Role'
                className='border px-4 py-2 w-75 rounded ' />
              <input type="number"
                // required

                name='userNum'
                value={formData.userNum}
                onChange={handleChange}
                placeholder='Number'
                className='border px-4 py-2 w-75 rounded ' />
              <input type="text"
                // required

                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Password'
                className='border px-4 py-2 w-75 rounded ' />
              <p className='text-red-600 text-left'>{message}</p>
              <button type='submit' className='w-1/2 bg-green-600 hover:bg-green-700 cursor-pointer px-5 py-2 text-white font-semibold rounded '>Add</button>
            </form>
          </div>
        </div>
      }



    </div>
  )
}
