import { useNavigate } from "react-router-dom";

export default function RegisterChoice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-2">
          Rejoindre ZamZam
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Choisissez votre profil
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/register?role=client")}
            className="w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700"
          >
            🙋‍♀️ Je suis client
          </button>

          <button
            onClick={() => navigate("/register?role=vendor")}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
          >
            🏪 Je suis commerçant / fournisseur
          </button>
        </div>
      </div>
    </div>
  );
}
