import { useEffect, useState } from "react";

export default function EnJuegoKnocKout({ enjuego, minutosDeJuego }) {
  const [equipo1, setEquipo1] = useState(enjuego.equipo1);
  const [equipo2, setEquipo2] = useState(enjuego.equipo2);
  const [TiempoJugando, setTiempoJugando] = useState(minutosDeJuego * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [terminoJuego, setTerminoJuego] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && TiempoJugando > 0) {
      timer = setTimeout(() => {
        setTiempoJugando((prev) => prev - 1);
      }, 1000);
    } else if (TiempoJugando === 0) {
      console.log("¡Termino el tiempo!");
      setIsRunning(false);
      setTerminoJuego();
    }
    return () => clearTimeout(timer);
  }, [isRunning, TiempoJugando]);

  const iniciarConteo = () => {
    setTiempoJugando(minutosDeJuego * 60);
    setIsRunning(true);
  };
  return (
    <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
      <p className="text-xl font-semibold mb-4 text-gray-700">
        Tiempo: <span className="text-blue-600">{TiempoJugando}</span> segundos
      </p>
      <button
        onClick={iniciarConteo}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Iniciar / Reiniciar Conteo
      </button>

      <div className="text-black mt-4">
        <h2 className="font-bold mb-2">Equipos jugando</h2>

        <div className="mb-4">
          <h3 className="font-semibold text-lg">{equipo1.nombre}</h3>
          <p className="flex items-center">
            <button
              onClick={() =>
                setEquipo1({
                  ...equipo1,
                  goles: equipo1.goles <= 0 ? 0 : equipo1.goles - 1,
                })
              }
              className="px-2 py-1 bg-red-500 text-white font-bold rounded mr-2"
            >
              -
            </button>
            Goles: <span className="mx-2">{equipo1.goles}</span>
            <button
              onClick={() =>
                setEquipo1({
                  ...equipo1,
                  goles: equipo1.goles + 1,
                })
              }
              className="px-2 py-1 bg-green-500 text-white font-bold rounded ml-2"
            >
              +
            </button>
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">{equipo2.nombre}</h3>
          <p className="flex items-center">
            <button
              onClick={() =>
                setEquipo2({
                  ...equipo2,
                  goles: equipo2.goles <= 0 ? 0 : equipo2.goles - 1,
                })
              }
              className="px-2 py-1 bg-red-500 text-white font-bold rounded mr-2"
            >
              -
            </button>
            Goles: <span className="mx-2">{equipo2.goles}</span>
            <button
              onClick={() =>
                setEquipo2({
                  ...equipo2,
                  goles: equipo2.goles + 1,
                })
              }
              className="px-2 py-1 bg-green-500 text-white font-bold rounded ml-2"
            >
              +
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
