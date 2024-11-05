import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import RegistrarEquipos from "../pages/registrar-equipos/RegistrarEquipos";
import MostrarEquipos from "../pages/mostrar-equipos/MostrarEquipos";
import ComenzarTorneo from "../pages/comenzar-torneo/ComenzarTorneo";
import { Torneo } from "../pages/comenzar-torneo/Torneo";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar-equipos" element={<RegistrarEquipos />} />
        <Route
          path="/mostrar-equipos/:tipoTorneo"
          element={<MostrarEquipos />}
        />
        <Route path="/comenzar-torneo/:tipoTorneo" element={<Torneo />} />
      </Routes>
    </BrowserRouter>
  );
}
