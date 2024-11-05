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
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-6">
          {torneo.nombre}
        </h1>
        <p className="text-gray-600 text-center mb-4 text-lg">
          {torneo.descripcion}
        </p>
        <p className="text-gray-500 text-sm mb-8 italic text-center">
          {torneo.jugabilidad}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Reglas del Torneo
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 pl-4">
            {torneo.reglas.map((regla, index) => (
              <li key={index}>{regla}</li>
            ))}
          </ul>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            Equipos en Juego
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
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

        <div className="text-center mt-8">
          <button
            onClick={() => setComenzar(true)}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Comenzar Torneo
          </button>
        </div>

        {comenzar && (
          <div className="mt-8">
            <ComenzarTorneo torneo={torneo} equipos={equipos} />
          </div>
        )}
      </div>
    </div>
  );
};
