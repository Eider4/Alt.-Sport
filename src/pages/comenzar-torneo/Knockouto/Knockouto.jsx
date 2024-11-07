import { useEffect, useState } from "react";
import EnJuegoKnocKout from "./EnJuegoKnocKout";
import { FaPlay } from "react-icons/fa";

export const Knockouto = ({ equipos: Equipos }) => {
  const [equipos, setEquipos] = useState(null);
  const [enjuego, setEnjuego] = useState(null);
  const [Ganadores, setGanadores] = useState({});
  const [minutosDeJuego, setMinutosDeJuego] = useState(3);
  const [numeroPartido, setNumeroPartido] = useState(0);
  const [rondas, setRondas] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [EstadisticasTorneo, setEstadisticasTorneo] = useState(null);
  const [active, setActive] = useState(false);
  const handleJugar = (i, equipos = {}) => {
    if (Object.keys(equipos).length > i + 1) {
      setEnjuego({
        equipo1: { ...equipos[i], goles: 0 },
        equipo2: { ...equipos[i + 1], goles: 0 },
      });
      setActive(true);
      return;
    }
    setNumeroPartido(0);
  };
  const otroPartido = () => {
    setEnjuego({});
    handleJugar(numeroPartido + 2, equipos);
  };
  const reiniciarTorneo = () => {
    setEquipos(handleEquiposImpar(Equipos));
    setEnjuego(null);
    setGanadores({});
    setMinutosDeJuego(3);
    setNumeroPartido(0);
    setRondas(0);
    setIsRunning(false);
    setEstadisticasTorneo(null);
    setActive(false);
  };
  const handleEquiposImpar = (equipos = Equipos) => {
    if (!equipos || equipos.length % 2 === 0) return equipos;
    const equipoExtra = equipos[Math.floor(Math.random() * equipos.length)];
    return [...equipos, equipoExtra];
  };
  useEffect(() => {
    if (!equipos) {
      setEquipos(Equipos);
    }
  }, [Equipos]);
  useEffect(() => {
    if (equipos) {
      setEquipos(equipos.sort(() => Math.random() - 0.5));
    }
    if (!equipos || equipos.length > 0) return;
    setRondas((prevRondas) => prevRondas + 1);
    const PartidosDeRonda = Ganadores.round
      ? Object.values(Ganadores.round).map((equipo) => equipo.ganador)
      : [];
    const nuevosEquipos =
      PartidosDeRonda.length % 2 === 0
        ? PartidosDeRonda
        : handleEquiposImpar(PartidosDeRonda);
    setEquipos(nuevosEquipos);
    handleJugar(0, nuevosEquipos);
    setGanadores({});
  }, [equipos]);
  useEffect(() => {
    if (Object.keys(Ganadores).length > 0)
      setEstadisticasTorneo((prev) => ({
        ...prev,
        [`Ganadores${rondas}`]: Ganadores,
      }));
  }, [numeroPartido, Ganadores]);
  useEffect(() => {
    setEquipos(handleEquiposImpar(Equipos));
  }, []);
  useEffect(() => {
    if (numeroPartido == 0) {
      if (Object.keys(Ganadores).length > 0) {
        setEquipos([]);
      }
    }
  }, [numeroPartido]);
  return (
    <>
      <button
        className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 flex items-center justify-center"
        onClick={reiniciarTorneo}
      >
        Reiniciar torneo
      </button>
      <div className="p-6 bg-gradient-to-r from-green-200 via-green-300 to-green-400 min-h-screen text-gray-800 font-sans">
        <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-600">
          Torneo Knockout
        </h1>

        <div className="mb-6 p-4 bg-gray-200 bg-opacity-80 rounded-lg shadow-lg text-center">
          <p className="text-lg text-gray-600">
            Total de equipos:{" "}
            {equipos && (
              <span className="font-bold text-indigo-500">
                {equipos.length}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mb-8 space-y-4">
          <div className="flex items-center">
            <input
              type="number"
              min={0}
              max={90}
              value={minutosDeJuego}
              onChange={(e) =>
                setMinutosDeJuego(
                  e.target.value <= 0 || !e.target.value ? 0 : e.target.value
                )
              }
              className="w-16 px-2 py-1 text-lg text-blue-500 rounded-l-lg focus:ring-2 focus:ring-blue-400"
            />
            <label className="bg-gray-300 text-gray-700 px-2 py-1.5 text-lg rounded-r-lg">
              Minutos
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {equipos &&
            equipos.length > 0 &&
            equipos.map((item, i) => {
              const isActive = i === numeroPartido || i - 1 === numeroPartido;
              const wonLastRound = Object.keys(Ganadores).some((key) => {
                return Object.values(Ganadores[key]).some(
                  (e) => e.ganador.nombre === item.nombre
                );
              });
              const isPAr = i % 2 === 0;
              let m = isPAr ? "mr-10" : "";

              return (
                <div key={i} className="relative">
                  <div
                    onClick={() => handleJugar(i, equipos)}
                    className={`p-4 rounded-lg cursor-pointer shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                      isActive
                        ? "bg-green-500 "
                        : i % 2 === 0
                        ? "bg-green-200 text-black "
                        : "bg-green-800 text-white"
                    } ${wonLastRound ? "border-4 border-yellow-400" : ""}`}
                  >
                    <p className="text-center font-semibold">{item.nombre}</p>
                    {isActive && isRunning && (
                      <span className="block text-center mt-2 text-yellow-300 animate-pulse">
                        <FaPlay className="inline-block mr-2" />
                        Jugando!!!
                      </span>
                    )}
                  </div>
                  {isPAr ? (
                    <p className="text-center text-gray-800">Vs</p>
                  ) : (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </div>
              );
            })}
        </div>

        {active && enjuego && minutosDeJuego > 0 && (
          <div className="fixed top-8 right-10 p-4 bg-green-600 text-white rounded-lg shadow-lg">
            <EnJuegoKnocKout
              enjuego={enjuego}
              numeroPartido={numeroPartido}
              minutosDeJuego={minutosDeJuego}
              setGanadores={setGanadores}
              setNumeroPartido={setNumeroPartido}
              otroPartido={otroPartido}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </div>
        )}

        {EstadisticasTorneo &&
          Object.entries(EstadisticasTorneo).map(([ronda, ganadores], i) => (
            <div key={i} className="mb-8">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Ronda {parseInt(ronda.split("")[ronda.length - 1]) + 1}
              </h2>
              <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto text-sm text-gray-700">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Ganador</th>
                      <th className="px-6 py-3 text-left">Goles</th>
                      <th className="px-6 py-3 text-left">Perdedor</th>
                      <th className="px-6 py-3 text-left">Goles</th>
                      <th className="px-6 py-3 text-left">Penaltis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(ganadores.round).map((partido, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-300 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 text-left font-medium text-gray-800">
                          {partido.ganador.nombre}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-800">
                          {partido.ganador.goles}
                        </td>
                        <td className="px-6 py-4 text-left font-medium text-gray-800">
                          {partido.perdedor.nombre}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-800">
                          {partido.perdedor.goles}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {partido.penaltis ? "Si" : "No"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
