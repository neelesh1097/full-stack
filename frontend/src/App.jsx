import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Product from "./pages/Product";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";

function App() {
  return (
    <div className="px-4 sm:px-[5vw]  md:px-[7vw] lg:px-[9vw]">


    <Navbar />
   
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/collection" element={<ProtectedRoute><Collection /></ProtectedRoute>} />
           <Route path="/product/:productId" element={<ProtectedRoute><Product /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
          <Route path="/order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
        </Routes>
        <Footer />

        </div>
  );
}

export default App;

