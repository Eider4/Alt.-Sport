import { useEffect, useState } from "react";
import EnJuegoKnocKout from "../Knockouto/EnJuegoKnocKout";
import Tabla from "./tabla";

export default function Ronda1({
  grupo,
  minutosDeJuego,
  setResultadosRonda1,
  tipoGrupo,
  setFinalizadoRonda1,
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [comenzar, setComenzar] = useState(false);
  const [EquiposEnJuego, setEquiposEnJuego] = useState(null);
  const [ganadoresRonda, setGanadoresRonda] = useState({ round: {} });
  const [numeroPartido, setNumeroPartido] = useState(0);
  const f_comenzarPartido = (indices) => {
    if (indices && indices.length > 0) {
      const [index1, index2] = indices;
      setComenzar(true);
      setEquiposEnJuego({
        equipo1: { ...grupo[index1], goles: 0, golesTotales: 0 },
        equipo2: { ...grupo[index2], goles: 0, golesTotales: 0 },
      });
    } else {
      setEquiposEnJuego({});
      setFinalizadoRonda1(true);
    }
  };
  useEffect(() => {
    setResultadosRonda1((prev) => ({
      ...prev,
      [tipoGrupo]: ganadoresRonda.round,
    }));
  }, [EquiposEnJuego, ganadoresRonda, numeroPartido]);

  const partidos = [
    [0, 1],
    [1, 2],
    [2, 0],
  ];
  const otroPartido = (f) => {
    f_comenzarPartido(partidos[f]);
  };
  useEffect(() => {
    console.log(EquiposEnJuego);
  }, [EquiposEnJuego]);

  return (
    <div>
      <div>
        <div className="my-10   cursor-pointer bg-blue-100 p-4 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out">
          <h1 className="text-xl font-bold text-gray-800">Ronda 1</h1>
        </div>
        {grupo && grupo.length > 0 && grupo && (
          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Partidos</h1>
            <div className="space-y-2 text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <p>{grupo[0].nombre}</p>
                <span>Vs</span>
                <p>{grupo[1].nombre}</p>
                {EquiposEnJuego && EquiposEnJuego.equipo1 == grupo[0].nombre
                  ? "jugando..."
                  : ""}
              </div>
              <div className="flex items-center gap-2">
                <p>{grupo[1].nombre}</p>
                <span>Vs</span>
                <p>{grupo[2].nombre}</p>
                {EquiposEnJuego && EquiposEnJuego.equipo1 == grupo[1].nombre
                  ? "jugando..."
                  : ""}
              </div>
              <div className="flex items-center gap-2">
                <p>{grupo[2].nombre}</p>
                <span>Vs</span>
                <p>{grupo[0].nombre}</p>
                {EquiposEnJuego && EquiposEnJuego.equipo1 == grupo[2].nombre
                  ? "jugando..."
                  : ""}
              </div>
              <button
                className={`bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out ${
                  numeroPartido != 0 || EquiposEnJuego ? "hidden" : ""
                }`}
                onClick={() => f_comenzarPartido(partidos[0])}
              >
                Comenzar
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {ganadoresRonda && Object.values(ganadoresRonda.round).length > 0 && (
          <Tabla ganadoresRonda={ganadoresRonda.round} />
        )}
      </div>
      {comenzar && (
        <EnJuegoKnocKout
          enjuego={EquiposEnJuego}
          minutosDeJuego={minutosDeJuego}
          setGanadores={setGanadoresRonda}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          comenzar={comenzar}
          setNumeroPartido={setNumeroPartido}
          numeroPartido={numeroPartido}
          otroPartido={otroPartido}
          partidosSumar1={true}
        />
      )}
    </div>
  );
}
