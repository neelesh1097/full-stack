import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CardTotal from '../components/CardTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, delivery_fee, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size]) {
          const product = products.find((prod) => prod._id === itemId);
          if (product) {
            totalAmount += product.price * cartItems[itemId][size];
          }
        }
      }
    }
    return totalAmount;
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap"
            >
              {/* Product Info */}
              <div className="flex items-center gap-6">
                <img
                  className='w-16 sm:w-20'
                  src={productData.images && productData.images.length > 0 ? productData.images[0] : assets.placeholder_icon}
                  alt={productData.name}
                />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                type="number"
                min={0}
                value={item.quantity}
                onChange={e => {
                  const newQty = Math.max(0, Number(e.target.value));
                  updateQuantity(item._id, item.size, newQty);
                }}
              />

              {/* Delete Icon */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className='w-4 mr-4 sm:w-5 cursor-pointer'
                src={assets.bin_icon}
                alt="Delete"
              />
            </div>
          );
        })}
      </div>

      {/* Cart Total Section */}
      <div className='flex justify-end my-20'>
        <div className="w-full sm:w-[450px]">
          <CardTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <hr />
      <div className="flex justify-between">
        <p>Shipping Fees</p>
        <p>{currency} {delivery_fee}</p>
      </div>
      <hr />
      <div className="flex justify-between">
        <b>TOTAL</b>
        <b>
          {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
        </b>
      </div>
    </div>
  )
}

export default Cart
