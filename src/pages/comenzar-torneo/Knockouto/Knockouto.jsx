import { useState } from "react";
import useStoreUsuario from "../../../store/manageUser";
import EnJuegoKnocKout from "./EnJuegoKnocKout";

export const Knockouto = ({ torneo, equipos }) => {
  //  torneo
  // equipos

  const [enjuego, setEnjuego] = useState(null);
  // const [Ganadores, setGanadores] = useState([]);
  const [minutosDeJuego, setMinutosDeJuego] = useState(0.1);
  const handleJugar = (i) => {
    setEnjuego({
      equipo1: { ...equipos[i], goles: 0 },
      equipo2: { ...equipos[i + 1], goles: 0 },
    });
  };

  const otroPartido = () => {
    setEnjuego(null);
  };

  const numeroPartido = 0;
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
        {equipos.map((item, i) => (
          <div
            onClick={() => handleJugar(i)}
            key={i}
            className={`p-2 m-1 w-28 text-white rounded-lg
              ${i % 2 === 0 ? "bg-slate-700" : "bg-orange-700 mb-7"} 
              ${
                i == numeroPartido || i - 1 == numeroPartido
                  ? "border-4 border-lime-500"
                  : ""
              }
            `}
          >
            <p>{item.nombre}</p>
            {enjuego && i == numeroPartido && (
              <div className="fixed top-8 right-10 bg-green-600 p-2 rounded-lg shadow-md hover:bg-green-700 cursor-pointer transition duration-200 ease-in-out w-72">
                <EnJuegoKnocKout
                  enjuego={enjuego}
                  minutosDeJuego={minutosDeJuego}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
