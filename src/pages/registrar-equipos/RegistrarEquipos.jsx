import { useState } from "react";
import UnEquipo from "./UnEquipo";
import { useNavigate } from "react-router-dom";

export default function RegistrarEquipos() {
  const [conJugadores, setConJugadores] = useState(false);
  const [cantidadJugadores, setCantidadJugadores] = useState(3);
  const [cantidadEquipos, setCantidadEquipos] = useState([1]);

  const navigate = useNavigate();
  const usuario = localStorage.getItem("usuario");

  if (!usuario)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-green-200 to-green-400">
        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg transform hover:bg-green-700 hover:scale-105 transition duration-300 ease-in-out"
        >
          Registrarse
        </button>
      </div>
    );

  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-6">
      <div className="max-w-lg mx-auto bg-white p-6 pb-2 rounded-lg shadow-xl transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-green-800 mb-6 animate-fade-in">
          Registrar Equipos
        </h1>

        <div className="mb-6 animate-slide-in">
          <label className="block text-gray-700 font-semibold mb-2">
            Cantidad de Jugadores
          </label>
          <input
            type="number"
            min={3}
            max={20}
            placeholder="5"
            onChange={(e) => setCantidadJugadores(Number(e.target.value))}
            value={cantidadJugadores}
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={conJugadores}
            onChange={(e) => setConJugadores(e.target.checked)}
            className="mr-3 text-green-600 focus:ring focus:ring-green-400 transition-all duration-300 transform scale-110 cursor-pointer"
          />
          <label className="text-gray-700 font-semibold">
            Incluir jugadores
          </label>
        </div>

        <button
          type="button"
          onClick={() => {
            setCantidadEquipos([...cantidadEquipos, crypto.randomUUID()]);
          }}
          className="w-full bg-green-600 text-white py-2 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:bg-green-700 hover:scale-105"
        >
          Nuevo equipo
        </button>

        <div className="mt-6 space-y-4">
          {cantidadEquipos.length >= 0 &&
            cantidadEquipos.map((i) => (
              <div
                key={i}
                className="p-4 bg-white border border-green-300 rounded-lg shadow-lg transition-all duration-300 transform hover:shadow-xl"
              >
                <UnEquipo
                  cantidadJugadores={cantidadJugadores}
                  conJugadores={conJugadores}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
