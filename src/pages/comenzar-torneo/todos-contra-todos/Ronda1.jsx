import { useEffect, useState } from "react";
import EnJuegoKnocKout from "../Knockouto/EnJuegoKnocKout";

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
    console.log(ganadoresRonda.round);
  }, [ganadoresRonda]);

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
              </div>
              <div className="flex items-center gap-2">
                <p>{grupo[1].nombre}</p>
                <span>Vs</span>
                <p>{grupo[2].nombre}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>{grupo[2].nombre}</p>
                <span>Vs</span>
                <p>{grupo[0].nombre}</p>
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
          <div>
            <div>
              <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto text-sm text-gray-700">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Ganador</th>
                      <th className="px-6 py-3 text-left">Goles</th>
                      <th className="px-6 py-3 text-left">Goles Totales</th>
                      <th className="px-6 py-3 text-left">Perdedor</th>
                      <th className="px-6 py-3 text-left">Goles</th>
                      <th className="px-6 py-3 text-left">Goles Totales</th>
                      <th className="px-6 py-3 text-left">Penaltis</th>
                    </tr>
                  </thead>
                  {Object.values(ganadoresRonda.round).map((partido, index) => (
                    <tbody key={index}>
                      <tr className="border-t border-gray-300 hover:bg-gray-50">
                        <td className="px-6 py-4 text-left font-medium text-gray-800">
                          {partido.ganador.nombre}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-800">
                          {partido.ganador.goles}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-800">
                          {partido.ganador.golesTotales}
                        </td>
                        <td className="px-6 py-4 text-left font-medium text-gray-800">
                          {partido.perdedor.nombre}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-800">
                          {partido.perdedor.goles}
                        </td>
                        <td className="px-6 py-4 text-center text-gray-800">
                          {partido.perdedor.golesTotales}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {partido.penaltis ? "Si" : "No"}
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
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
