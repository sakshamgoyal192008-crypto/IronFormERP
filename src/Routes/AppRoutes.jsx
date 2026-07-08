import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Sites from "../pages/Sites";
import Labour from "../pages/Labour";
import Materials from "../pages/Materials";
import Finance from "../pages/Finance";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sites" element={<Sites />} />
      <Route path="/labour" element={<Labour />} />
      <Route path="/materials" element={<Materials />} />
      <Route path="/finance" element={<Finance />} />
    </Routes>
  );
}

export default AppRoutes;