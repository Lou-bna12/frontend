import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">

        {/* Titre */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Inscription consommateur
        </h1>

        {/* Formulaire */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="Nom"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            placeholder="Adresse e-mail"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Adresse postale"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Conditions */}
          <label className="flex items-start gap-2 text-sm text-gray-600 mt-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
              className="mt-1"
            />
            <span>
              Je suis d'accord avec les{" "}
              <span className="text-green-600 font-medium cursor-pointer">
                conditions générales
              </span>
            </span>
          </label>

          {/* Bouton */}
          <button
            type="button"
            disabled={!accepted}
            className={`w-full py-3 rounded-lg font-medium transition
              ${
                accepted
                  ? "bg-green-700 text-white hover:bg-green-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            S’inscrire
          </button>
        </form>

        {/* Lien login */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Vous avez déjà un compte ?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-700 font-medium cursor-pointer"
          >
            Se connecter
          </span>
        </p>

      </div>
    </div>
  );
}
