import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./layouts/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Vision from "./pages/Vision";

function App() {
  // 🔑 UNE SEULE source de vérité
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <Router>
      {/* Header toujours visible */}
      <Header activeTab={activeTab} onChange={setActiveTab} />

      <Routes>
        {/* Home = onglets Magasins / Produits / Livraison */}
        <Route
          path="/"
          element={<Home activeTab={activeTab} />}
        />

        {/* Pages secondaires */}
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<Vision />} />
      </Routes>

      {/* Footer toujours visible */}
      <Footer />
    </Router>
  );
}

export default App;
