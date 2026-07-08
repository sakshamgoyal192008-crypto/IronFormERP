import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 flex-1 min-h-screen bg-slate-100">

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default MainLayout;