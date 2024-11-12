import { useState } from "react";
import useStoreUsuario from "../../store/manageUser";
import ComenzarTorneo from "./ComenzarTorneo";
import { torneos } from "../../utils/torneos";
import { useParams } from "react-router-dom";
import { FaCheckSquare, FaPlayCircle } from "react-icons/fa";

export const Torneo = () => {
  const { tipoTorneo } = useParams();
  const torneo = torneos.find((torneo) => torneo.id == tipoTorneo);
  const todosLosEquipos = useStoreUsuario((state) => state.usuario.equipos);
  const equiposEnJuego = JSON.parse(localStorage.getItem(tipoTorneo));
  const [comenzar, setComenzar] = useState(false);
  const [equipos, setEquipos] = useState(
    equiposEnJuego.map((item) => {
      const equipoKey = Object.keys(todosLosEquipos).find(
        (element) => element === item
      );
      todosLosEquipos[equipoKey].id = crypto.randomUUID();
      return todosLosEquipos[equipoKey];
    })
  );
  const borrarEquipo = (id) => {
    setEquipos(equipos.filter((equipo) => equipo.id != id));
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          {torneo.nombre}
        </h1>
        <p className="text-gray-600 text-center mb-4 text-lg">
          {torneo.descripcion}
        </p>
        <p className="text-gray-500 text-sm mb-8 italic text-center">
          {torneo.jugabilidad}
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Reglas del Torneo
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-3 pl-4">
            {torneo.reglas.map((regla, index) => (
              <li key={index}>{regla}</li>
            ))}
          </ul>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Equipos en Juego
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipos &&
              equipos
                // ?.sort(() => Math.random() - 0.5)
                .map((equipo, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-xl transition duration-300 ease-in-out"
                  >
                    <div className="flex items-center mb-4">
                      <FaCheckSquare className="text-green-500 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        {equipo.nombre}
                      </h3>
                    </div>
                    <p
                      className="text-gray-600"
                      onClick={() => borrarEquipo(equipo.id)}
                    >
                      Borrar
                    </p>
                  </div>
                ))}
          </div>
        </div>

        {!comenzar && (
          <div className="text-center mt-8">
            <button
              onClick={() => setComenzar(true)}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center"
            >
              <FaPlayCircle className="mr-2" />
              Comenzar Torneo
            </button>
          </div>
        )}

        {comenzar && (
          <div className="mt-8">
            <ComenzarTorneo torneo={torneo} equipos={equipos} />
          </div>
        )}
      </div>
    </div>
  );
};
