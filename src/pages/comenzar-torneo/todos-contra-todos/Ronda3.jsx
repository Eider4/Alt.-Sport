import React, { useEffect, useState } from "react";
import EnJuegoKnocKout from "../Knockouto/EnJuegoKnocKout";

export default function Ronda3({ equipos: Equipos }) {
  const [equipos, setEquipos] = useState([]);
  const [numeroPartido, setNumeroPartido] = useState(0);
  const [enjuego, setEnjuego] = useState(0);
  const [Ganador, setGanador] = useState(null);
  const [Ganadores, setGanadores] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [final, setFinal] = useState(false);
  useEffect(() => {
    setEquipos(Equipos);
  }, []);
  const f_revolverEquipos = () => {
    setEquipos((prev) => prev.sort(() => Math.random() - 0.5));
  };
  const handleJugar = (i, equipos = {}) => {
    if (Object.keys(equipos).length > i + 1) {
      if (equipos[i].nombre != equipos[i + 1].nombre) {
        setEnjuego({
          equipo1: { ...equipos[i], goles: 0 },
          equipo2: { ...equipos[i + 1], goles: 0 },
        });
        return;
      } else {
        setGanador(equipos[i]);
        return;
      }
    }
    setNumeroPartido(0);
  };
  const otroPartido = () => {
    setEnjuego({});
    handleJugar(numeroPartido + 2, equipos);
  };
  console.log("Ganadores", Ganadores);
  console.log("Ganador", Ganador);
  return (
    <div>
      <button onClick={f_revolverEquipos}>revolver</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {equipos &&
          equipos.length > 0 &&
          equipos.map((item, i) => {
            if (!item) return;
            const isActive = i === numeroPartido || i - 1 === numeroPartido;

            const isPAr = i % 2 === 0;

            return (
              <div key={i} className={`relative  `}>
                <div
                  onClick={() => handleJugar(i, equipos)}
                  className={`p-4 rounded-lg cursor-pointer shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                    isActive
                      ? "bg-green-500 "
                      : i % 2 === 0
                      ? "bg-green-200 text-black "
                      : "bg-green-800 text-white"
                  } 
                    ${false ? "bg-amber-400" : ""}
                    `}
                >
                  <p className="text-center font-semibold">{item.nombre}</p>
                </div>
                {isPAr ? (
                  <p className="text-center text-gray-800">Vs</p>
                ) : (
                  <>
                    <br />
                  </>
                )}
              </div>
            );
          })}
      </div>
      <EnJuegoKnocKout
        enjuego={enjuego}
        minutosDeJuego={1}
        setGanadores={setGanadores}
        setNumeroPartido={setNumeroPartido}
        numeroPartido={numeroPartido}
        otroPartido={otroPartido}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        final={final}
      />

      {Object.keys(Ganadores).length > 0 &&
        Object.keys(Ganadores.round).length >= 2 && (
          <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Partido Final
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              <span className="font-semibold">
                {Ganadores.round.partido0.ganador.nombre}
              </span>{" "}
              vs{" "}
              <span className="font-semibold">
                {Ganadores.round.partido2.ganador.nombre}
              </span>
            </p>
            <button
              onClick={() => {
                handleJugar(0, [
                  Ganadores.round.partido0.ganador,
                  Ganadores.round.partido2.ganador,
                ]);
                setFinal(true);
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Comenzar
            </button>
          </div>
        )}
    </div>
  );
}
