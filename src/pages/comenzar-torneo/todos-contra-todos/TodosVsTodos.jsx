import { useEffect, useState } from "react";
import Ronda1 from "./Ronda1";
import Ronda2 from "./Ronda2";
import Ronda3 from "./Ronda3";

export const TodosVsTodos = ({ equipos: Equipos }) => {
  const [grupo1, setGrupo1] = useState(null);
  const [grupo2, setGrupo2] = useState(null);
  const [minutosDeJuego, setMinutosDeJuego] = useState(0.05);
  const [FinalizadoRonda1, setFinalizadoRonda1] = useState(false);
  const [FinalizadoRonda1Ga, setFinalizadoRonda1Gb] = useState(false);
  const [resultadosRonda1, setResultadosRonda1] = useState(false);
  const [GanadoresRonda2, setGanadoresRonda2] = useState(null);

  const f_inicializarGrupos = () => {
    const [a, b, c, d, e, f] = Equipos;
    // .sort(() => Math.random() - 0.5);
    setGrupo1([a, b, c]);
    setGrupo2([d, e, f]);
  };

  useEffect(() => {
    f_inicializarGrupos(resultadosRonda1);
  }, []);

  const f_reiniciarTorneo = () => {
    f_inicializarGrupos();
  };

  return (
    <div>
      <button
        onClick={f_reiniciarTorneo}
        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Reiniciar Torneo
      </button>

      <h1 className="text-3xl font-bold text-gray-800 my-4">
        Todos contra todos
      </h1>
      <div>
        <input
          type="number"
          value={minutosDeJuego}
          min={0}
          max={90}
          onChange={(e) => setMinutosDeJuego(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="cursor-pointer bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Grupo 1</h2>
          {grupo1 && (
            <div className="space-y-2">
              {grupo1
                // .sort(() => Math.random() - 0.5)
                .map((item, i) => (
                  <div
                    key={item.id}
                    className="p-2 bg-gray-100 rounded-md border border-gray-300"
                  >
                    <p className="text-gray-800">{item.nombre}</p>
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="cursor-pointer bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Grupo 2</h2>
          {grupo2 && (
            <div className="space-y-2">
              {grupo2.map((item, i) => (
                <div
                  key={item.id}
                  className="p-2 bg-gray-100 rounded-md border border-gray-300"
                >
                  <p className="text-gray-800">{item.nombre}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {grupo1 && grupo2 && (
        <div>
          <Ronda1
            grupo={grupo1}
            tipoGrupo="grupo1"
            minutosDeJuego={minutosDeJuego}
            setResultadosRonda1={setResultadosRonda1}
            setFinalizadoRonda1={setFinalizadoRonda1}
          />
          <Ronda1
            grupo={grupo2}
            tipoGrupo="grupo2"
            minutosDeJuego={minutosDeJuego}
            setFinalizadoRonda1={setFinalizadoRonda1Gb}
            setResultadosRonda1={setResultadosRonda1}
          />
        </div>
      )}
      {/* {FinalizadoRonda1Ga &&
        FinalizadoRonda1 &&
        resultadosRonda1 &&
        Object.values(resultadosRonda1).length && (
        )} */}
      <Ronda2
        resultadosRonda1={resultadosRonda1}
        setResultadosRonda1={setResultadosRonda1}
        minutosDeJuego={minutosDeJuego}
        setGanadoresRonda2={setGanadoresRonda2}
      />
      {GanadoresRonda2 && <Ronda3 equipos={GanadoresRonda2} />}
    </div>
  );
};
