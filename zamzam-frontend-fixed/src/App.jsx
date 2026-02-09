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
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;