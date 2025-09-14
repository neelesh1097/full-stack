import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './components/Login'

function App() {

  const [token , setToken] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('adminToken')
    if (saved) setToken(saved)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setToken('')
  }

  return (
    <BrowserRouter>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <div className='pt-16 flex'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
              <Routes>
                <Route path='/add' element={<Add />} />
                <Route path='/list' element={<List />} />
                <Route path='/orders' element={<Order />} />
                <Route path='*' element={<Navigate to='/add' replace />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </BrowserRouter>
  )
}

export default App