import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Connexion
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Adresse email"
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate("/register-choice")}
            className="text-green-600 cursor-pointer font-medium"
          >
            S’inscrire
          </span>
        </p>
      </div>
    </div>
  );
}
