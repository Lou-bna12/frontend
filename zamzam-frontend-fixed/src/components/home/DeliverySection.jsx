export default function DeliverySection() {
  return (
    <section className="py-14">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Livraison simple et fiable
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Étape 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center
                        transition hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="font-semibold mb-2">
            Commandez en ligne
          </h3>
          <p className="text-sm text-gray-600">
            Choisissez vos produits auprès des magasins partenaires.
          </p>
        </div>

        {/* Étape 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center
                        transition hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="font-semibold mb-2">
            Préparation rapide
          </h3>
          <p className="text-sm text-gray-600">
            Les commerçants préparent votre commande avec soin.
          </p>
        </div>

        {/* Étape 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center
                        transition hover:shadow-lg hover:-translate-y-1">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="font-semibold mb-2">
            Livraison à domicile
          </h3>
          <p className="text-sm text-gray-600">
            Recevez votre commande rapidement et en toute sécurité.
          </p>
        </div>
      </div>
    </section>
  );
}
