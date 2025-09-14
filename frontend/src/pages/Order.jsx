import React, {useContext} from 'react'
import {ShopContext} from'../context/ShopContext'
import Title from '../components/Title'

const Order = () => {
  const {cartItems, products, currency} = useContext(ShopContext);

  // Convert cartItems to an array of order objects
  const orders = [];
  for (const itemId in cartItems) {
    const product = products.find(p => p._id === itemId);
    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        orders.push({
          productId: itemId,
          product,
          price: product?.price,
          name: product?.name,
          image: product?.image,
          quantity: cartItems[itemId][size],
          size,
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
          status: 'READY TO SHIP'
        });
      }
    }
  }

  return (
    <div className ='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {orders.length > 0 ? orders.map((order, idx) => (
          <div key={idx} className="border-t py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
            {order.image && order.image[0] && (
              <img src={order.image[0]} alt={order.name} className="w-20 h-20 sm:w-16 sm:h-16 object-cover rounded mx-auto sm:mx-0" />
            )}
            <div className="flex-1 flex flex-col gap-1 text-center sm:text-left px-2">
              {order.name && (
                <div className="text-base font-medium">{order.name}</div>
              )}
              <div className="text-sm">
                {currency}{order.price}
                {order.quantity && <> &nbsp; Quantity: {order.quantity}</>}
                {order.size && <> &nbsp; Size:{order.size}</>}
              </div>
              {order.date && (
                <div className="text-xs text-gray-500">DATE:{order.date}</div>
              )}
            </div>
            <div className="w-full sm:w-1/4 flex justify-center items-center">
              <span className="text-green-600 font-semibold text-xs sm:text-base text-center w-full">{order.status}</span>
            </div>
            <div className="w-full sm:w-1/4 flex justify-center items-center mt-2 sm:mt-0">
              <button className="bg-blue-600 text-white px-4 py-1 rounded text-xs sm:text-sm">Track Order</button>
            </div>
          </div>
        )) : (
          <div className="text-center py-10 text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  )
}

export default Order