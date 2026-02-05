import { useState } from "react";
import Header from "./components/header/Header";
import Home from "./pages/Home";

function App() {
  const [activeTab, setActiveTab] = useState("stores");

  return (
    <>
      <Header activeTab={activeTab} onChange={setActiveTab} />
      <Home activeTab={activeTab} />
    </>
  );
}

export default App;
