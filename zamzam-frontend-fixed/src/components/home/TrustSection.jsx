export default function TrustSection() {
  return (
    <section className="py-14 bg-gray-50 rounded-3xl my-14">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Pourquoi faire confiance à ZamZam ?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {/* Sécurité */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm
                        transition hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="font-semibold mb-2">
            Paiements sécurisés
          </h3>
          <p className="text-sm text-gray-600">
            Vos transactions sont protégées et sécurisées.
          </p>
        </div>

        {/* Magasins vérifiés */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm
                        transition hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl mb-4">🏪</div>
          <h3 className="font-semibold mb-2">
            Magasins vérifiés
          </h3>
          <p className="text-sm text-gray-600">
            Nous sélectionnons des commerçants de confiance.
          </p>
        </div>

        {/* Livraison */}
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm
                        transition hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="font-semibold mb-2">
            Livraison fiable
          </h3>
          <p className="text-sm text-gray-600">
            Suivi clair et livraison rapide à domicile.
          </p>
        </div>
      </div>
    </section>
  );
}
