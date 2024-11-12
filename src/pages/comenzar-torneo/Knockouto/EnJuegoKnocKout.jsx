import { useEffect, useState } from "react";

export default function EnJuegoKnocKout({
  enjuego: EquiposEnJuego,
  minutosDeJuego,
  setGanadores,
  setNumeroPartido,
  numeroPartido,
  otroPartido,
  isRunning,
  setIsRunning,
  comenzar = true,
  partidosSumar1 = false,
  final = false,
}) {
  const [equipo1, setEquipo1] = useState(null);
  const [equipo2, setEquipo2] = useState(null);
  const [TiempoJugando, setTiempoJugando] = useState(minutosDeJuego * 60);
  const [minutosJugandoMensaje, setMinutosJugandoMensaje] = useState(
    minutosDeJuego - 1
  );
  const [segundosJugandoMensaje, setSegundosJugandoMensaje] = useState();
  const [empate, setEmpate] = useState(false);
  const [GAnador, setGAnador] = useState(null);
  useEffect(() => {
    console.log(EquiposEnJuego.equipo1 && EquiposEnJuego.equipo2);
    if (EquiposEnJuego.equipo1 && EquiposEnJuego.equipo2) {
      const e1 = EquiposEnJuego.equipo1;
      const e2 = EquiposEnJuego.equipo2;
      console.log(e1);
      e1.goles = 0;
      e2.goles = 0;
      setEquipo1(e1);
      setEquipo2(e2);
    }
  }, [EquiposEnJuego]);

  useEffect(() => {
    let timer;
    if (equipo1 && equipo2 && isRunning && TiempoJugando > 0) {
      timer = setTimeout(() => {
        setTiempoJugando((prev) => prev - 1);
      }, 1);
    } else if (TiempoJugando <= 0) {
      setIsRunning(false);
      const ganador =
        equipo1.goles > equipo2.goles
          ? { ganador: equipo1, perdedor: equipo2 }
          : equipo2.goles === equipo1.goles
          ? "empate"
          : { ganador: equipo2, perdedor: equipo1 };
      if (ganador === "empate") {
        setEmpate(true);
      } else {
        setGAnador({ ...ganador, penaltis: false });
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, TiempoJugando]);

  useEffect(() => {
    handleTime();
  }, [TiempoJugando]);

  const iniciarConteo = () => {
    {
      if (comenzar) {
        setTiempoJugando(minutosDeJuego * 60);
        setIsRunning(true);
      }
    }
  };

  const handleGanador = () => {
    if (GAnador) {
      let f;
      setNumeroPartido((prev) => {
        f = partidosSumar1 ? prev + 1 : prev + 2;
        return f;
      });
      setGanadores((prev) => ({
        ...prev,
        round: {
          ...prev.round,
          [`partido${numeroPartido}`]: GAnador,
        },
      }));
      setEquipo1(null);
      setEquipo2(null);
      setEmpate(null);
      setGAnador(null);
      otroPartido(f);
    }
  };

  const handleTime = () => {
    setMinutosJugandoMensaje(Math.floor(TiempoJugando / 60));
    setSegundosJugandoMensaje(TiempoJugando % 60);
  };

  if (!equipo1 || !equipo2) return;
  return (
    <div className="fixed top-8 right-10 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl">
        <p className="text-xl font-semibold mb-2 text-gray-700">Tiempo:</p>
        <p className="text-lg mb-4 text-gray-700">
          <span className="font-bold mr-2 text-blue-800">
            {minutosJugandoMensaje}
          </span>
          Minutos,
          <span className="font-bold ml-2 mr-2 text-blue-800">
            {segundosJugandoMensaje}
          </span>
          Segundos
        </p>

        {GAnador ? (
          <>
            {!final && (
              <button
                onClick={handleGanador}
                className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Siguiente
              </button>
            )}
          </>
        ) : (
          <button
            onClick={iniciarConteo}
            className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Iniciar
          </button>
        )}

        {equipo1 && equipo2 && (
          <div className="text-gray-900 mt-6 w-full">
            <h2 className="font-bold mb-2 text-gray-800">Equipos jugando</h2>
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {equipo1.nombre}
              </h3>
              <p className="flex items-center">
                <button
                  onClick={() =>
                    setEquipo1((prev) => ({
                      ...prev,
                      goles: Math.max(prev.goles - 1, 0),
                      golesTotales: Math.max(prev.golesTotales - 1, 0),
                    }))
                  }
                  className="px-2 py-1 bg-gray-600 text-white font-bold rounded mr-2 hover:bg-gray-700"
                >
                  -
                </button>
                Goles: <span className="mx-2">{equipo1.goles}</span>
                <button
                  onClick={() =>
                    setEquipo1((prev) => ({
                      ...prev,
                      golesTotales: prev.golesTotales + 1,
                      goles: prev.goles + 1,
                    }))
                  }
                  className="px-2 py-1 bg-green-600 text-white font-bold rounded ml-2 hover:bg-green-700"
                >
                  +
                </button>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {equipo2.nombre}
              </h3>
              <p className="flex items-center">
                <button
                  onClick={() =>
                    setEquipo2((prev) => ({
                      ...prev,
                      golesTotales: Math.max(prev.golesTotales - 1, 0),
                      goles: Math.max(prev.goles - 1, 0),
                    }))
                  }
                  className="px-2 py-1 bg-gray-600 text-white font-bold rounded mr-2 hover:bg-gray-700"
                >
                  -
                </button>
                Goles: <span className="mx-2">{equipo2.goles}</span>
                <button
                  onClick={() =>
                    setEquipo2((prev) => ({
                      ...prev,
                      golesTotales: prev.golesTotales + 1,
                      goles: prev.goles + 1,
                    }))
                  }
                  className="px-2 py-1 bg-green-600 text-white font-bold rounded ml-2 hover:bg-green-700"
                >
                  +
                </button>
              </p>
            </div>
            {GAnador && (
              <p className="mt-4 font-bold text-gray-800">
                Ganador: {GAnador.ganador.nombre}
              </p>
            )}
          </div>
        )}

        {empate && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                ¡Empate!
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Los equipos han quedado empatados. Selecciona el ganador:
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => {
                    setGAnador({
                      ganador: equipo1,
                      perdedor: equipo2,
                      penaltis: true,
                    });
                    setEmpate(false);
                  }}
                  className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-500 transition duration-300 shadow-lg"
                >
                  {equipo1.nombre}
                </button>
                <button
                  onClick={() => {
                    setGAnador({
                      ganador: equipo2,
                      perdedor: equipo1,
                      penaltis: true,
                    });
                    setEmpate(false);
                  }}
                  className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-500 transition duration-300 shadow-lg"
                >
                  {equipo2.nombre}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
