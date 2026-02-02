import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import VendorLayout from "../layouts/VendorLayout";
import VendorStats from "../components/VendorStats";
import VendorOrdersTable from "../components/VendorOrdersTable";

export default function VendorDashboard() {
  const { user } = useAuth();

  // 🔐 Protection : accès fournisseur uniquement
  if (!user || user.role !== "fournisseur") {
    return <Navigate to="/connexion" />;
  }

  return (
    <VendorLayout>
      {/* 📊 Cartes statistiques */}
      <VendorStats />

      {/* 📦 Table des commandes */}
      <VendorOrdersTable />
    </VendorLayout>
  );
}
