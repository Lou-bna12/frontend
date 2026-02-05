import { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./layouts/Footer";

import Home from "./pages/Home";
import About from "./pages/About";


function App() {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <>
      <Header activeTab={activeTab} onChange={setActiveTab} />
      <Home activeTab={activeTab} />
      <Footer />
    </>
  );
}

export default App;
