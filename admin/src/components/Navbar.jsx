import React from 'react'
import { assets } from '../assets/assets'
// import { NavLink, Link } from 'react-router-dom'

const Navbar = ({ onLogout }) => {
  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white border-b'>
      <div className='w-full max-w-6xl mx-auto px-2 py-2 flex items-center justify-between'>
        <img src={assets.logo} className='w-[max(10%,80px)] h-auto' alt='' />
        <button onClick={onLogout} className='px-3 py-1.5 text-sm bg-black text-white rounded-md'>Logout</button>
      </div>
    </div>
  )
}

export default Navbar