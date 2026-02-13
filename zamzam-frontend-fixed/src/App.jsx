import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./layouts/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Vision from "./pages/Vision";
import StoreDetails from "./pages/StoreDetails";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterChoice from "./pages/auth/RegisterChoice";
import RegisterVendor from "./pages/auth/RegisterVendor";
import Courses from "./pages/Courses";
import Restaurants from "./pages/Restaurants";


function App() {
  const [activeTab, setActiveTab] = useState("products");


  return (
    <Router>
      <Header activeTab={activeTab} onChange={setActiveTab} />

      <Routes>
        <Route path="/" element={<Home activeTab={activeTab} />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<Vision />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-choice" element={<RegisterChoice />} />
        <Route path="/register-vendor" element={<RegisterVendor />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/restaurants" element={<Restaurants />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;