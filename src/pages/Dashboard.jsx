import { useState, useEffect } from "react";
import { dashboardCards } from "../data/dashboardData";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const [siteCount, setSiteCount] = useState(0);
  const [labourCount, setLabourCount] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const siteSnapshot = await getDocs(collection(db, "sites"));
      setSiteCount(siteSnapshot.size);

      const labourSnapshot = await getDocs(collection(db, "labours"));
      setLabourCount(labourSnapshot.size);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = dashboardCards.map((card) => {
    if (card.title === "Total Sites") {
      return { ...card, value: siteCount };
    }

    if (card.title === "Labours") {
      return { ...card, value: labourCount };
    }

    return card;
  });

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to IronForm ERP
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-3">
                    {card.value}
                  </h2>
                </div>

                <div className="bg-cyan-100 p-3 rounded-xl">
                  <Icon
                    className="text-cyan-600"
                    size={32}
                  />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Quick Actions */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

          <button className="bg-cyan-500 text-white p-5 rounded-2xl hover:bg-cyan-600 transition">
            ➕ Add Site
          </button>

          <button className="bg-green-500 text-white p-5 rounded-2xl hover:bg-green-600 transition">
            👷 Add Labour
          </button>

          <button className="bg-orange-500 text-white p-5 rounded-2xl hover:bg-orange-600 transition">
            📦 Add Material
          </button>

          <button className="bg-red-500 text-white p-5 rounded-2xl hover:bg-red-600 transition">
            💰 Add Expense
          </button>

        </div>

      </div>

      {/* Recent Activity */}

      <div className="mt-10 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

        <h2 className="text-2xl font-bold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between border-b pb-3">
            <span>✅ New Site Added</span>
            <span className="text-gray-500 text-sm">
              2 min ago
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>👷 Labour Added</span>
            <span className="text-gray-500 text-sm">
              15 min ago
            </span>
          </div>

          <div className="flex justify-between border-b pb-3">
            <span>📦 Material Issued</span>
            <span className="text-gray-500 text-sm">
              1 hour ago
            </span>
          </div>

          <div className="flex justify-between">
            <span>💰 Expense Added</span>
            <span className="text-gray-500 text-sm">
              Today
            </span>
          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;