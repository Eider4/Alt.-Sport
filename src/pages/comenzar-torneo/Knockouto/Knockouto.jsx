import { useEffect, useState } from "react";
import useStoreUsuario from "../../../store/manageUser";
import EnJuegoKnocKout from "./EnJuegoKnocKout";

export const Knockouto = ({ equipos: Equipos }) => {
  //  torneo
  // equipos

  const [equipos, setEquipos] = useState(Equipos);
  const [enjuego, setEnjuego] = useState(undefined);
  const [Ganadores, setGanadores] = useState({});
  const [minutosDeJuego, setMinutosDeJuego] = useState(0.05);
  const [numeroPartido, setNumeroPartido] = useState(0);
  const [rondas, setRondas] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const handleJugar = (i) => {
    if (Object.keys(equipos).length > i + 1) {
      setEnjuego({
        equipo1: { ...equipos[i], goles: 0 },
        equipo2: { ...equipos[i + 1], goles: 0 },
      });
      return;
    }
    setEnjuego(null);
  };

  const otroPartido = () => {
    setEnjuego(null);
    handleJugar(numeroPartido + 2);
  };
  useEffect(() => {
    if (enjuego === null) {
      Object.values(Ganadores);
      console.log(Ganadores);
      const f = Object.values(Ganadores.round1).map((equipo) => equipo);
      setEquipos(f);
      handleJugar(0);
      setNumeroPartido(0);
      setGanadores({});
    }
  }, [enjuego]);

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
          onChange={(e) => setMinutosDeJuego(e.target.value)}
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
              return e.nombre == item.nombre;
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
                {item.nombre}
                <span className="relative">
                  {i == numeroPartido && isRunning && (
                    <span className="absolute top-[2em] right-[-9em] text-black">
                      Jugando!!!
                    </span>
                  )}
                </span>
              </p>
              {enjuego && i == numeroPartido && minutosDeJuego > 0 && (
                <div className="fixed top-8 right-10 bg-green-600 p-2 rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition duration-200 ease-in-out w-72">
                  <EnJuegoKnocKout
                    enjuego={enjuego}
                    numeroPartido={numeroPartido}
                    minutosDeJuego={minutosDeJuego}
                    setGanadores={setGanadores}
                    setNumeroPartido={setNumeroPartido}
                    otroPartido={otroPartido}
                    rondas={rondas}
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
