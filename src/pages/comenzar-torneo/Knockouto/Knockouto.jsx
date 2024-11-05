import { useEffect, useState } from "react";
import useStoreUsuario from "../../../store/manageUser";
import EnJuegoKnocKout from "./EnJuegoKnocKout";

export const Knockouto = ({ equipos: Equipos }) => {
  const [equipos, setEquipos] = useState(Equipos);
  const [enjuego, setEnjuego] = useState(null);
  const [Ganadores, setGanadores] = useState({});
  const [minutosDeJuego, setMinutosDeJuego] = useState(3);
  const [numeroPartido, setNumeroPartido] = useState(0);
  const [rondas, setRondas] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [EstadisticasTorneo, setEstadisticasTorneo] = useState(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (numeroPartido || numeroPartido <= 0) {
      setRondas(0);
    }
  }, [numeroPartido]);

  const handleJugar = (i) => {
    if (Object.keys(equipos).length > i + 1) {
      setEnjuego({
        equipo1: { ...equipos[i], goles: 0 },
        equipo2: { ...equipos[i + 1], goles: 0 },
      });
      setActive(true);

      return;
    }
    handleFinRonda();
  };

  const otroPartido = () => {
    setEnjuego({});
    handleJugar(numeroPartido + 2);
  };
  const handleFinRonda = () => {
    if (!equipos.length > 2 || Object.keys(Ganadores).length <= 0) {
      console.log("second");
      return;
    }
    console.log(Ganadores);
    const PartidosDeRonda = Object.values(Ganadores.round).map(
      (equipo) => equipo.ganador
    );
    // console.log("first");
    // console.log(PartidosDeRonda);
    setEquipos(PartidosDeRonda);
    setNumeroPartido(0);
    setEstadisticasTorneo((prev) => ({
      ...prev,
      [`Ganadores${
        EstadisticasTorneo ? Object.keys(EstadisticasTorneo).length + 1 : 1
      }`]: Ganadores,
    }));
    setGanadores({});
    handleJugar(0);
    // console.log("first");
  };

  useEffect(() => {
    setRondas(rondas + 1);
  }, [EstadisticasTorneo]);

  useEffect(() => {
    if (equipos && equipos.length % 2 !== 0) {
      const numRandom = Math.floor(Math.random() * equipos.length);
      const f = equipos[numRandom];
      setEquipos([...equipos, f]);
    }
  }, [equipos]);
  // console.log(EstadisticasTorneo);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p>total de equipos {equipos.length}</p>
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
        {equipos.map((item, i) => {
          const d = Object.keys(Ganadores).some((key) => {
            const p = Object.values(Ganadores[key]).some((e) => {
              return e.ganador.nombre == item.nombre;
            });
            return p;
          });
          return (
            <div key={i}>
              <p
                onClick={() => handleJugar(i)}
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
            <div key={i} className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                Ronda {ronda}
              </h2>
              <table className="min-w-full border border-gray-300">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Nombre Ganadores
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Goles
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Nombre Perdedores
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Goles
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      penaltis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(ganadores.round).map((partido, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {partido.ganador.nombre}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {partido.ganador.goles}
                      </td>

                      <td className="border border-gray-300 px-4 py-2">
                        {partido.perdedor.nombre}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {partido.perdedor.goles}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
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
