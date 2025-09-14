import { ShopContext } from "../context/ShopContext"
import React, { useEffect, useState, useContext } from 'react'
import Title from '../components/Title';
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter by category and subcategory
      productsCopy = productsCopy.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );

      // Limit to 5
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]); // ✅ re-run when props/data change

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            images={item.images}   // ✅ pass array instead of image
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
