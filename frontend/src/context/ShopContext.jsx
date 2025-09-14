import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem("token");
    return stored && stored !== "null" && stored !== "" ? stored : null;
  });

  const navigate = useNavigate();

  // ✅ Add item to cart
  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (cartData[itemId]) {
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      } else {
        cartData[itemId] = { [size]: 1 };
      }

      return cartData;
    });
  };

  // ✅ Get total cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  // ✅ Update cart quantity
  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev);

      if (!cartData[itemId]) return prev;

      if (quantity > 0) {
        cartData[itemId][size] = quantity;
      } else {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      return cartData;
    });
  };

  // ✅ Calculate total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    try {
      for (const itemId in cartItems) {
        const itemInfo = products.find((p) => p._id === itemId);
        if (!itemInfo) continue;

        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            totalAmount += itemInfo.price * cartItems[itemId][size];
          }
        }
      }
    } catch (error) {
      console.error("Error calculating cart amount:", error);
    }
    return totalAmount;
  };

  // ✅ Fetch products (with useCallback to avoid re-creation)
  const getProductsData = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  }, [backendUrl]);

  // ✅ Restore token and fetch products on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    getProductsData();
  }, [getProductsData]);

  // ✅ Logout
  // const logout = () => {
  //   try {
  //     setToken(null);
  //     localStorage.removeItem("token");
  
  //     // optional: clear cart too
  //     setCartItems({});
  
  //     toast.info("Logged out successfully");
  //     navigate("/login"); // redirect to login page
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //     toast.error("Failed to log out");
  //   }
  // };
  const logout = () => {
    try {
      setToken(null);
      localStorage.removeItem("token"); 
      setCartItems({});
      toast.info("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };
  

  // ✅ Context value
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    logout,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
