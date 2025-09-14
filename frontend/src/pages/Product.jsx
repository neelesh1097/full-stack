import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProduct from '../components/RelatedProduct'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = () => {
    const item = products.find(p => p._id === productId)
    if (item) {
      console.log("Fetched product:", item)
      setProductData(item)
      if (Array.isArray(item.images) && item.images.length > 0) {
        setImage(item.images[0])
      }
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  if (!productData) return <div className="opacity-0"></div>

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Left side - gallery */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {Array.isArray(productData.images) &&
              productData.images.map((item, index) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  alt=""
                  key={index}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              ))}
          </div>
          <div className="w-full sm:w-[80%]">
            {image && <img className='w-full h-auto' src={image} alt={productData.name} />}
          </div>
        </div>

        {/* Right side - product info */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill().map((_, i) => (
              <img key={i} src={assets.star_icon} className='w-3.5' alt="star" />
            ))}
            <p className="pl-2">(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes?.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-600' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original products</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className='mt-20'>
        <div className="flex">
          <p className='px-5 py-3 text-sm'>Description</p>
          <p className='px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className="flex flex-col border-1 gap-4 px-6 py-6 text-sm text-gray-500">
          <p>100% Cotton Material...</p>
          <p>Round Neck & Stylish Short Sleeves...</p>
        </div>
      </div>

      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  )
}

export default Product

