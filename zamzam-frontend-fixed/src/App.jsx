import Navbar from "./components/Navbar";
import CategoryBar from "./components/CategoryBar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryBar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold">
          Bienvenue sur ZamZam
        </h1>
      </main>
    </div>
  );
}

export default App;
