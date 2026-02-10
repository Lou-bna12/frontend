import { useState } from "react";

export default function RegisterVendor() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        
        {/* Titre */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Inscription professionnelle
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
            type="text"
            placeholder="Nom de l'entreprise"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Numéro d'identification fiscale (NIF)"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Numéro de l'article du registre de commerce (NRC)"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="text"
            placeholder="Adresse de l'entreprise"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nom du référent"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="tel"
              placeholder="Mobile du référent"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

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
              <span className="text-green-600 underline cursor-pointer">
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
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Créer mon compte professionnel
          </button>
        </form>
      </div>
    </div>
  );
}
