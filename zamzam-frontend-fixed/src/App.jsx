import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";
import Header from "./components/header/Header";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Vendors from "./pages/Vendors";
import Cart from "./pages/Cart";
import Groceries from "./pages/Groceries";
import Restaurants from "./pages/Restaurants";
import Auto from "./pages/Auto";
import VendorDetail from "./pages/VendorDetail";
import Orders from "./pages/Orders";
import VendorDashboard from "./pages/VendorDashboard";
import VendorProducts from "./pages/VendorProducts";





function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
       {/*<Navbar />*/}
        <Header />
        <CategoryBar />

        <main className="max-w-7xl mx-auto px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/fournisseurs" element={<Vendors />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/courses" element={<Groceries />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/auto" element={<Auto />} />
            <Route path="/fournisseurs/:id" element={<VendorDetail />} />
            <Route path="/commandes" element={<Orders />} />
            <Route path="/dashboard-fournisseur" element={<VendorDashboard />} />
            <Route path="/dashboard-fournisseur/produits" element={<VendorProducts />} />






          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
