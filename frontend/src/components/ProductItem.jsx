import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        {Array.isArray(images) && images.length > 0 ? (
          <img
            className="hover:scale-110 transition ease-in-out"
            src={images[0]}  // ✅ show first image
            alt={name}
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{currency}{price}</p>
    </Link>
  )
}

export default ProductItem


