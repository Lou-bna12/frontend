import HeaderTabs from "./HeaderTabs";

export default function Header({ activeTab, onChange }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-semibold text-green-700">
          ZamZam
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium hover:underline">
            Devenir partenaire
          </button>
        </div>
      </div>

      <HeaderTabs activeTab={activeTab} onChange={onChange} />
    </header>
  );
}
