import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Champs fournisseur
  const [company, setCompany] = useState("");
  const [nif, setNif] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Merci de remplir tous les champs obligatoires");
      return;
    }

    if (role === "fournisseur" && (!company || !nif)) {
      alert("Merci de compléter les informations entreprise");
      return;
    }

    // 🔐 Mock inscription → login direct
    login(email, role);

    // 🔁 Redirection intelligente
    if (role === "fournisseur") {
      navigate("/dashboard-fournisseur");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* CLIENT */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Inscription consommateur
          </h2>

          <form
            onSubmit={handleSubmit}
            onClick={() => setRole("client")}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              S’inscrire
            </button>
          </form>
        </div>

        {/* FOURNISSEUR */}
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Inscription professionnelle
          </h2>

          <form
            onSubmit={handleSubmit}
            onClick={() => setRole("fournisseur")}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Nom du responsable"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Nom de l’entreprise"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="text"
              placeholder="Numéro d’identification fiscale (NIF)"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              S’inscrire
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 text-sm text-gray-500">
        Déjà un compte ?{" "}
        <Link to="/connexion" className="text-emerald-600 hover:underline">
          Se connecter
        </Link>
      </div>
    </div>
  );
}
