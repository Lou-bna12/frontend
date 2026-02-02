import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import VendorLayout from "../layouts/VendorLayout";
import VendorStats from "../components/VendorStats";
import VendorOrdersTable from "../components/VendorOrdersTable";
import VendorCharts from "../components/VendorCharts";


export default function VendorDashboard() {
  const { user } = useAuth();

  // 🔐 Protection : accès fournisseur uniquement
  if (!user || user.role !== "fournisseur") {
    return <Navigate to="/connexion" />;
  }

 return (
  <VendorLayout>
    {/* 📊 STATS */}
    <VendorStats />

    {/* 📈 GRAPHIQUES */}
    <VendorCharts />

    {/* 📦 TABLE COMMANDES */}
    <VendorOrdersTable />
  </VendorLayout>
);
}