import { useEffect, useState } from "react";
import useStoreUsuario from "../../../store/manageUser";
import EnJuegoKnocKout from "./EnJuegoKnocKout";

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
  useEffect(() => {
    if (!equipos) {
      setEquipos(Equipos);
    }
  }, [Equipos]);
  useEffect(() => {
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

  useEffect(() => {
    if (Object.keys(Ganadores).length > 0)
      setEstadisticasTorneo((prev) => ({
        ...prev,
        [`Ganadores${rondas}`]: Ganadores,
      }));
  }, [numeroPartido, Ganadores]);

  const otroPartido = () => {
    setEnjuego({});
    handleJugar(numeroPartido + 2, equipos);
  };

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

  const handleEquiposImpar = (equipos = Equipos) => {
    if (!equipos || equipos.length % 2 === 0) return equipos;
    const equipoExtra = equipos[Math.floor(Math.random() * equipos.length)];
    return [...equipos, equipoExtra];
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <p>total de equipos {equipos.length}</p> */}
      <br />
      <div className="flex items-center mb-4">
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
          className="mr-2 pl-1 text-green-600 focus:ring focus:ring-green-200"
        />
        <label className="text-gray-700">Minutos</label>
      </div>
      <label className="text-gray-700">
        Quieres que cada partido dure {minutosDeJuego}{" "}
        {minutosDeJuego == 1 ? "minuto" : "minutos"}
      </label>

      <div>
        {equipos &&
          equipos.length > 0 &&
          equipos?.map((item, i) => {
            const d = Object.keys(Ganadores).some((key) => {
              const p = Object.values(Ganadores[key]).some((e) => {
                return e.ganador.nombre == item.nombre;
              });
              return p;
            });
            return (
              <div key={i}>
                <p
                  onClick={() => handleJugar(i, equipos)}
                  className={`p-2 m-1 w-28 text-white rounded-lg cursor-pointer
              ${i % 2 === 0 ? "bg-slate-700" : "bg-orange-700 mb-7"} 
              ${d || i + 1 > numeroPartido ? "" : "opacity-75"} 
              ${
                i == numeroPartido || i - 1 == numeroPartido || d
                  ? "border-4 border-lime-500"
                  : ""
              }
            `}
                >
                  {item?.nombre}
                  <span className="relative">
                    {i == numeroPartido && isRunning && (
                      <span className="absolute top-[2em] right-[-9em] text-black">
                        Jugando!!!
                      </span>
                    )}
                  </span>
                </p>
                {active &&
                  enjuego &&
                  i == numeroPartido &&
                  minutosDeJuego > 0 && (
                    <div
                      style={{ zIndex: "3300px" }}
                      className="fixed top-8 right-10 bg-green-600 p-2 rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition duration-200 ease-in-out w-72"
                    >
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
              </div>
            );
          })}
        {EstadisticasTorneo &&
          Object.entries(EstadisticasTorneo).map(([ronda, ganadores], i) => (
            <div key={i} className="mb-6 overflow-x-auto sm:overflow-x-visible">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Ronda {ronda}
              </h2>
              <table className="min-w-full border border-gray-300 text-sm sm:text-base">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-300 px-2 py-2 sm:px-4 text-left">
                      Nombre Ganadores
                    </th>
                    <th className="border border-gray-300 px-2 py-2 sm:px-4 text-left">
                      Goles
                    </th>
                    <th className="border border-gray-300 px-2 py-2 sm:px-4 text-left">
                      Nombre Perdedores
                    </th>
                    <th className="border border-gray-300 px-2 py-2 sm:px-4 text-left">
                      Goles
                    </th>
                    <th className="border border-gray-300 px-2 py-2 sm:px-4 text-left">
                      Penaltis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(ganadores.round).map((partido, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">
                        {partido.ganador.nombre}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">
                        {partido.ganador.goles}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">
                        {partido.perdedor.nombre}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">
                        {partido.perdedor.goles}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 sm:px-4">
                        {partido.penaltis ? "Sí" : "No"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
};
