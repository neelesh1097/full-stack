import React, { useState } from 'react'
import axios from 'axios'

const backendUrl = 'http://localhost:4000'

export default function Add() {
  // Images (store File and preview URL)
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  const handleFileChange = (setter) => (e) => {
    const file = e.target.files?.[0]
    setter(file || null)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name || !description || !price) {
      setError('Please fill name, description and price')
      return
    }
    if (sizes.length === 0) {
      setError('Select at least one size')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('bestseller', String(bestseller))
    formData.append('sizes', JSON.stringify(sizes))

    image1 && formData.append('image1', image1)
    image2 && formData.append('image2', image2)
    image3 && formData.append('image3', image3)
    image4 && formData.append('image4', image4)

    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: token || ''
        }
      })
      setSuccess('Product added successfully')
      // reset minimal fields, keep images optional
      setName('')
      setDescription('')
      setPrice('')
      setCategory('Men')
      setSubCategory('Topwear')
      setBestseller(false)
      setSizes([])
      setImage1(null); setImage2(null); setImage3(null); setImage4(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product')
    } finally {
      setLoading(false)
    }
  }

  const sizeBtn = (label) => (
    <p
      key={label}
      onClick={() => toggleSize(label)}
      className={`${sizes.includes(label) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer rounded`}
    >
      {label}
    </p>
  )

  const ImagePicker = ({ idx, file, onChange }) => (
    <label className='group cursor-pointer border rounded-md flex items-center justify-center aspect-square overflow-hidden bg-gray-50 hover:bg-gray-100'>
      <input type='file' accept='image/*' className='hidden' onChange={onChange} />
      {file ? (
        <img src={URL.createObjectURL(file)} alt={`image-${idx}`} className='w-full h-full object-cover' />
      ) : (
        <div className='flex flex-col items-center text-gray-500 text-sm'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-8 h-8 mb-1 opacity-70'>
            <path d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375H8.25' />
            <path fillRule='evenodd' d='M4.5 6.75A2.25 2.25 0 016.75 4.5h5.25a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 17.25V6.75zm6.75 9a.75.75 0 10-1.5 0 .75.75 0 001.5 0z' clipRule='evenodd' />
          </svg>
          <span>Image {idx}</span>
        </div>
      )}
    </label>
  )

  return (
    <div className='pb-8'>
      <h1 className='text-2xl font-semibold mb-6'>Add Product</h1>

      <form className='space-y-6' onSubmit={onSubmitHandler}>
        {/* Images */}
        <section>
          <h2 className='text-lg font-medium mb-3'>Images</h2>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            <ImagePicker idx={1} file={image1} onChange={handleFileChange(setImage1)} />
            <ImagePicker idx={2} file={image2} onChange={handleFileChange(setImage2)} />
            <ImagePicker idx={3} file={image3} onChange={handleFileChange(setImage3)} />
            <ImagePicker idx={4} file={image4} onChange={handleFileChange(setImage4)} />
          </div>
        </section>

        {/* Basic Info */}
        <section className='grid md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm mb-1'>Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} type='text' placeholder='Product name' className='w-full border rounded-md px-3 py-2' />
            </div>

            <div>
              <label className='block text-sm mb-1'>Price ($)</label>
              <input value={price} onChange={e=>setPrice(e.target.value)} type='number' min='0' step='0.01' placeholder='0.00' className='w-full border rounded-md px-3 py-2' />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm mb-1'>Category</label>
                <select value={category} onChange={e=>setCategory(e.target.value)} className='w-full border rounded-md px-3 py-2 bg-white'>
                  <option>Women</option>
                  <option>Men</option>
                  <option>Kids</option>
                </select>
              </div>
              <div>
                <label className='block text-sm mb-1'>Subcategory</label>
                <select value={subCategory} onChange={e=>setSubCategory(e.target.value)} className='w-full border rounded-md px-3 py-2 bg-white'>
                  <option>Topwear</option>
                  <option>Bottomwear</option>
                  <option>Winterwear</option>
                </select>
              </div>
            </div>

            <div>
              <label className='block text-sm mb-1'>Product Sizes</label>
              <div className='flex flex-wrap gap-3'>
                {['S','M','L','XL','XXL'].map(sizeBtn)}
              </div>
            </div>

            <div className='flex gap-2 mt-2'>
              <input onChange={() => setBestseller(prev => !prev)} type='checkbox' id='bestseller' checked={bestseller} className='accent-black' />
              <label className='cursor-pointer' htmlFor='bestseller'>Add to bestseller</label>
            </div>
          </div>

          <div>
            <label className='block text-sm mb-1'>Description</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} rows='12' placeholder='Write a detailed description…' className='w-full border rounded-md px-3 py-2 resize-y'></textarea>
          </div>
        </section>

        {error && <p className='text-red-600 text-sm'>{error}</p>}
        {success && <p className='text-green-600 text-sm'>{success}</p>}

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <button type='submit' disabled={loading} className='bg-black text-white px-5 py-2 rounded-md'>
            {loading ? 'Saving...' : 'ADD'}
          </button>
          <button type='button' onClick={()=>{
            setName(''); setDescription(''); setPrice(''); setCategory('Men'); setSubCategory('Topwear'); setBestseller(false); setSizes([]); setImage1(null); setImage2(null); setImage3(null); setImage4(null); setError(''); setSuccess('')
          }} className='border px-5 py-2 rounded-md'>Cancel</button>
        </div>
      </form>
    </div>
  )
}