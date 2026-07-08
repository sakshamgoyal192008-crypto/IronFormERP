import { dashboardCards } from "../data/dashboardData";

function Dashboard() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
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

                <Icon
                  className="text-cyan-500"
                  size={40}
                />

              </div>
            </div>
          );
        })}

      </div>
    </>
  );
}

export default Dashboard;