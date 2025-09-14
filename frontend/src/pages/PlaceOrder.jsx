import React, { useState } from 'react'
import Title from '../components/Title'
import CardTotal from '../components/CardTotal'
import { useNavigate } from 'react-router-dom';
import {assets} from '../assets/assets'

const PlaceOrder = () => {
  const [selectedPayment, setSelectedPayment] = useState(""); // track selected payment
  const navigate = useNavigate();

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-1'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>


        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />

        </div>
        <div className="flex gap-3">
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='First-name' />
            <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='Last-name' />

</div>
             <input type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='Email' />
               <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='STREET' />
       <div className="flex gap-3">
          <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='CITY' />
            <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='STATE' />

</div>
<div className="flex gap-3">
          <input type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='Zipcode' />
            <input type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='COUNTRY' />

</div>
         <input type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full  ' placeholder ='Phone' />
      </div>

      {/* right side */}
      <div className="mt-8">

        <div className="mt-8 min-w-80">

          <CardTotal/>
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${selectedPayment === 'stripe' ? 'bg-green-100 border-green-500' : ''}`}
              onClick={() => setSelectedPayment('stripe')}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${selectedPayment === 'stripe' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} />
            </div>
            {/* Razorpay */}
            <div
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${selectedPayment === 'razorpay' ? 'bg-green-100 border-green-500' : ''}`}
              onClick={() => setSelectedPayment('razorpay')}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${selectedPayment === 'razorpay' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            {/* Cash on Delivery */}
            <div
              className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${selectedPayment === 'cod' ? 'bg-green-100 border-green-500' : ''}`}
              onClick={() => setSelectedPayment('cod')}
            >
              <p className={`min-w-3.5 h-3.5 border rounded-full ${selectedPayment === 'cod' ? 'bg-green-500 border-green-500' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
<button onClick={()=>navigate('/order')} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder