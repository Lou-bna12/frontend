import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./layouts/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Vision from "./pages/Vision";

function App() {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <Router>
      <Header activeTab={activeTab} onChange={setActiveTab} />

      <Routes>
        <Route path="/" element={<Home activeTab={activeTab} />} />
        <Route path="/about" element={<About />} />
        <Route path="/vision" element={<Vision />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;