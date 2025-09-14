import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import {assets} from'../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>

        <Title text1={'ABOUT'} text2={"US"} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>

        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt=""/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>At Forever, we believe fashion is more than just clothing — it’s an expression of who you are. Our mission is simple: to create timeless, affordable, and stylish pieces that make you feel confident every single day.</p>
        <p>Founded with the vision of blending quality, comfort, and trend-forward designs, Forever is dedicated to bringing you apparel that lasts — not just in durability, but in style. From everyday essentials to statement-making outfits, every collection we launch is designed to keep you looking your best, season after season.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Timeless Fashion – Styles that never go out of trend.

Quality First – Fabrics and fits that feel as good as they look.

Affordable Luxury – Making fashion accessible without compromise.

Customer Love – You inspire us to create; your satisfaction drives us forward</p>
        </div>
      </div>

      <div className='text-xl py-4'>
<Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row gap-8 text-sm mb-20'>
        {[1,2,3].map((_, i) => (
          <div key={i} className="flex-1 bg-white border border-gray-200 shadow-sm px-8 md:px-10 py-8 sm:py-14 flex flex-col gap-4 rounded-lg mx-auto">
            <b className="text-gray-700 font-semibold text-base mb-2">Quality Assurance</b>
            <p className="text-gray-500 leading-relaxed">Forever isn’t just a clothing brand — it’s a community of dreamers, doers, and style enthusiasts who believe in living boldly and dressing with confidence.</p>
          </div>
        ))}
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About