import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("client");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, role);

    if (role === "fournisseur") {
      navigate("/dashboard-fournisseur");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Connexion
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="client">Client</option>
            <option value="fournisseur">Fournisseur</option>
          </select>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
