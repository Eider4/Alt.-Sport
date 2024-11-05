import { useState } from "react";
import useStoreUsuario from "../../store/manageUser";
import ComenzarTorneo from "./ComenzarTorneo";
import { torneos } from "../../utils/torneos";
import { useParams } from "react-router-dom";

export const Torneo = () => {
  const { tipoTorneo } = useParams();
  const torneo = torneos.find((torneo) => torneo.id == tipoTorneo);
  const todosLosEquipos = useStoreUsuario((state) => state.usuario.equipos);
  const equiposEnJuego = JSON.parse(localStorage.getItem("equiposEnJuego"));
  const [comenzar, setComenzar] = useState(false);
  const equipos = equiposEnJuego.map((item) => {
    const equipoKey = Object.keys(todosLosEquipos).find(
      (element) => element === item
    );
    return todosLosEquipos[equipoKey];
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
          {torneo.nombre}
        </h1>
        <p className="text-gray-700 text-center mb-4">{torneo.descripcion}</p>
        <p className="text-gray-600 text-sm mb-6 italic">
          {torneo.jugabilidad}
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            Reglas del Torneo
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {torneo.reglas.map((regla, index) => (
              <li key={index}>{regla}</li>
            ))}
          </ul>
        </div>

        <hr className="my-6" />

        <div>
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Equipos en Juego
          </h2>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {equipos &&
              equipos
                ?.sort(() => Math.random() - 0.5)
                .map((equipo, index) => (
                  <li key={index} className="font-medium text-gray-900">
                    {equipo.nombre}
                  </li>
                ))}
          </ul>
        </div>
        <hr />
        <br />
        <div>
          <button onClick={() => setComenzar(true)}>comenzar</button>
        </div>
        {comenzar && <ComenzarTorneo torneo={torneo} equipos={equipos} />}
      </div>
    </div>
  );
};
