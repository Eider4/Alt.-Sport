import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RegistrarEquipos from "../pages/registrar-equipos/RegistrarEquipos";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar-equipos" element={<RegistrarEquipos />} />
      </Routes>
    </BrowserRouter>
  );
}
