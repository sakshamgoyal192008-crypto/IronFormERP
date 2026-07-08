import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;