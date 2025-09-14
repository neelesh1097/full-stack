import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = "https://full-stack-6lnv.onrender.com";

export default function List() {
  const [list, setList] = useState([]);

  // Fetch product list
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch products");
    }
  };

  // Remove product
// Remove product
const removeProduct = async (id) => {
  try {
    const token = localStorage.getItem("adminToken") || ""; // or however you store it
    const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
      headers: { token },
    });

    if (response.data.success) {
      toast.success("Product removed successfully");
      fetchList(); // refresh list
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to remove product");
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="mb-2 text-xl font-bold">All Products List</p>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 rounded">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className="text-center">Action</b>
      </div>

      {/* Product list */}
      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-2 border-b"
        >
          {/* Image */}
          <img
            className="w-12 h-12 object-cover rounded"
            src={item.images?.[0] || "/placeholder.png"}
            alt={item.name}
          />

          {/* Name */}
          <p>{item.name}</p>

          {/* Category */}
          <p>{item.category}</p>

          {/* Price */}
          <p>{item.price} ₹</p>

          {/* Action buttons */}
          <div className="text-center">
            <button
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => removeProduct(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}




