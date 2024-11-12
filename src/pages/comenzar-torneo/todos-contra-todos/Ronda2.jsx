import { useEffect, useState } from "react";
import EnJuegoKnocKout from "../Knockouto/EnJuegoKnocKout";
import Tabla from "./tabla";
// let resultadosRonda1 = {
//   grupo1: {
//     partido0: {
//       ganador: {
//         goles: 2,
//         golesTotales: 4,
//         id: "6fa480bf-1877-4476-90c6-2feb3681c71e",
//         jugadores: {},
//         nombre: "Equipo 2",
//       },
//       penaltis: false,
//       perdedor: {
//         golesTotales: 2,
//         goles: 0,
//         id: "3ced5961-8779-45f4-b0fa-02b2f0e0e7c4",
//         jugadores: {},
//         nombre: "Equipo 1",
//       },
//     },
//     partido1: {
//       ganador: {
//         goles: 2,
//         id: "6fa480bf-1877-4476-90c6-2feb3681c71e",
//         golesTotales: 6,
//         jugadores: {},
//         nombre: "Equipo 3",
//       },
//       penaltis: false,
//       perdedor: {
//         golesTotales: 1,
//         goles: 0,
//         id: "3ced5961-8779-45f4-b0fa-02b2f0e0e7c4",
//         jugadores: {},
//         nombre: "Equipo 2",
//       },
//     },
//     partido3: {
//       ganador: {
//         goles: 2,
//         id: "6fa480bf-1877-4476-90c6-2feb3681c71e",
//         golesTotales: 4,
//         jugadores: {},
//         nombre: "Equipo 1",
//       },
//       penaltis: false,
//       perdedor: {
//         golesTotales: 2,
//         goles: 0,
//         id: "3ced5961-8779-45f4-b0fa-02b2f0e0e7c4",
//         jugadores: {},
//         nombre: "Equipo 3",
//       },
//     },
//   },
//   grupo2: {
//     partido0: {
//       ganador: {
//         goles: 0,
//         id: "6fa480bf-1877-4476-90c6-2feb3681c71e",
//         golesTotales: 5,
//         jugadores: {},
//         nombre: "Equipo 4",
//       },
//       penaltis: false,
//       perdedor: {
//         golesTotales: 4,
//         goles: 0,
//         id: "3ced5961-8779-45f4-b0fa-02b2f0e0e7c4",
//         jugadores: {},
//         nombre: "Equipo 5",
//       },
//     },
//     partido1: {
//       ganador: {
//         goles: 0,
//         golesTotales: 4,
//         id: "6fa480bf-1877-4476-90c6-2feb3681c71e",
//         jugadores: {},
//         nombre: "Equipo 6",
//       },
//       penaltis: false,
//       perdedor: {
//         goles: 0,
//         id: "3ced5961-8779-45f4-b0fa-02b2f0e0e7c4",
//         golesTotales: 4,
//         jugadores: {},
//         nombre: "Equipo 5",
//       },
//     },
//     partido3: {
//       ganador: {
//         goles: 0,
//         id: "6fa480bf-1877-4476-90c6-2feb3681c71e",
//         golesTotales: 2,
//         jugadores: {},
//         nombre: "Equipo 6",
//       },
//       penaltis: false,
//       perdedor: {
//         golesTotales: 2,
//         goles: 0,
//         id: "3ced5961-8779-45f4-b0fa-02b2f0e0e7c4",
//         jugadores: {},
//         nombre: "Equipo 4",
//       },
//     },
//   },
// };
export default function Ronda2({
  resultadosRonda1,
  minutosDeJuego,
  setGanadoresRonda2,
}) {
  const [partidosRonda, setPartidosRonda] = useState(null);
  const [equiposEnJuego, setEquiposEnJuego] = useState(null);
  const [ganadoresRonda, setGanadoresRonda] = useState({ round: {} });
  const [numeroPartido, setNumeroPartido] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [comenzar, setComenzar] = useState(false);
  const f_buscarDoble = (grupo = "grupo1", tipo = "ganador") => {
    const array = Object.values(resultadosRonda1[grupo]).map(
      (item) => item[tipo]
    );
    const conteo = {};
    const duplicados = [];
    for (const item of array) {
      const nombre = item.nombre;
      if (conteo[nombre]) {
        conteo[nombre].count += 1;
      } else {
        conteo[nombre] = { count: 1, objeto: item };
      }
    }
    for (const key in conteo) {
      if (conteo[key].count > 1) {
        duplicados.push(conteo[key].objeto);
      }
    }
    if (duplicados.length > 0) {
      return duplicados[0];
    }
    return {};
  };
  const f_buscarUnicos = (grupo = "grupo1", tipo = "ganador") => {
    const array = Object.values(resultadosRonda1[grupo]).map(
      (item) => item[tipo]
    );
    const conteo = {};
    const unicos = [];
    for (const item of array) {
      const nombre = item.nombre;
      if (conteo[nombre]) {
        conteo[nombre].count += 1;
      } else {
        conteo[nombre] = { count: 1, objeto: item };
      }
    }
    for (const key in conteo) {
      if (conteo[key].count === 1) {
        unicos.push(conteo[key].objeto);
      }
    }

    return unicos[0];
  };

  const f_otroPartido = () => {
    if (
      numeroPartido < 3 &&
      Object.keys(partidosRonda[`partido${numeroPartido + 1}`]).length > 0
    ) {
      setEquiposEnJuego({
        equipo1: partidosRonda[`partido${numeroPartido + 1}`].equipo1,
        equipo2: partidosRonda[`partido${numeroPartido + 1}`].equipo2,
      });
    } else {
    }
  };
  useEffect(() => {
    if (numeroPartido > 3) {
      console.log(ganadoresRonda);
      const ganadores = Object.values(ganadoresRonda.round).map((partido) => {
        return partido.ganador;
      });
      const mejorPerdedor = () => {
        const perdedores = Object.values(ganadoresRonda.round).map(
          (partido) => partido.perdedor
        );
        perdedores.sort((a, b) => b.golesTotales - a.golesTotales);
        return perdedores[0];
      };
      const EquiposQuePasan = [...ganadores, mejorPerdedor()];
      setGanadoresRonda2(EquiposQuePasan);
    }
  }, [numeroPartido, ganadoresRonda]);

  useEffect(() => {
    if (
      resultadosRonda1 &&
      Object.keys(resultadosRonda1).length > 0 &&
      Object.keys(f_buscarDoble("grupo1", "ganador")).length > 0 &&
      Object.keys(f_buscarDoble("grupo2", "perdedor")).length > 0 &&
      Object.keys(f_buscarUnicos("grupo2", "ganador")).length > 0 &&
      Object.keys(f_buscarUnicos("grupo1", "perdedor")).length > 0
    ) {
      return setPartidosRonda({
        partido1: {
          equipo1: f_buscarDoble("grupo1", "ganador"),
          equipo2: f_buscarDoble("grupo2", "perdedor"),
        },
        partido2: {
          equipo1: f_buscarDoble("grupo2", "ganador"),
          equipo2: f_buscarDoble("grupo1", "perdedor"),
        },
        partido3: {
          equipo1: f_buscarUnicos("grupo2", "ganador"),
          equipo2: f_buscarUnicos("grupo1", "perdedor"),
        },
      });
    } else {
      todosContraTodos();
    }
  }, [resultadosRonda1]);
  const todosContraTodos = () => {
    const equiposMap = new Map();
    for (const grupo in resultadosRonda1) {
      for (const partido in resultadosRonda1[grupo]) {
        const { ganador, perdedor } = resultadosRonda1[grupo][partido];
        if (!equiposMap.has(ganador.nombre))
          equiposMap.set(ganador.nombre, ganador);
        if (!equiposMap.has(perdedor.nombre))
          equiposMap.set(perdedor.nombre, perdedor);
      }
    }
    const array = Array.from(equiposMap.values()).sort(
      () => Math.random() - 0.5
    );
    setPartidosRonda({
      partido1: {
        equipo1: array[0],
        equipo2: array[1],
      },
      partido2: {
        equipo1: array[2],
        equipo2: array[3],
      },
      partido3: {
        equipo1: array[4],
        equipo2: array[5],
      },
    });
  };
  if (partidosRonda && resultadosRonda1)
    return (
      <>
        <div className="space-y-6 mt-10">
          {resultadosRonda1 && Object.keys(resultadosRonda1).length > 0 && (
            <div
              onClick={() => console.log("click")}
              className="cursor-pointer bg-blue-100 p-4 rounded-lg shadow-md hover:bg-blue-200 transition duration-300 ease-in-out"
            >
              <h1 className="text-xl font-bold text-gray-800">Ronda 2</h1>
            </div>
          )}
          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
            {Object.keys(partidosRonda).length > 0 &&
              Object.values(partidosRonda).map((partido, i) => (
                <div
                  key={i}
                  className="bg-white p-4 border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out"
                >
                  <h1 className="text-lg font-semibold text-gray-700 mb-2">
                    Partido: {i + 1}
                  </h1>
                  <p className="text-gray-600">
                    Equipo 1:
                    {partido.equipo1?.nombre ?? "Nombre no disponible"}
                  </p>
                  <p className="text-gray-600">
                    Equipo 2:
                    {partido.equipo2?.nombre ?? "Nombre no disponible"}
                  </p>
                </div>
              ))}

            <div className="text-center mt-4">
              <button
                onClick={() => {
                  setComenzar(true);
                  setEquiposEnJuego({
                    equipo1: partidosRonda[`partido${numeroPartido}`].equipo1,
                    equipo2: partidosRonda[`partido${numeroPartido}`].equipo2,
                  });
                }}
                className={`bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out ${
                  equiposEnJuego ? "hidden" : ""
                }`}
              >
                Comenzar
              </button>
            </div>
            {!equiposEnJuego && (
              <button
                className={`bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 ease-in-out `}
                onClick={todosContraTodos}
              >
                Revolver
              </button>
            )}
            {equiposEnJuego && Object.keys(equiposEnJuego).length > 0 && (
              <EnJuegoKnocKout
                enjuego={equiposEnJuego}
                minutosDeJuego={minutosDeJuego}
                setGanadores={setGanadoresRonda}
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                setNumeroPartido={setNumeroPartido}
                numeroPartido={numeroPartido}
                otroPartido={f_otroPartido}
                partidosSumar1={true}
                comenzar={comenzar}
              />
            )}
            <div>
              {ganadoresRonda &&
                Object.values(ganadoresRonda.round).length > 0 && (
                  <Tabla ganadoresRonda={ganadoresRonda.round} />
                )}
            </div>
          </div>
        </div>
      </>
    );
}
