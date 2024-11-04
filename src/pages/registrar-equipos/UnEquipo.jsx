import { useState } from "react";

export default function UnEquipo({
  cantidadJugadores,
  conJugadores,
  setEquipo,
}) {
  const [nombre, setNombre] = useState("");
  const [jugadores, setJugadores] = useState({});
  const [listo, setListo] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setJugadores((prev) => ({ ...prev, [name]: value }));
    setEquipo((prev) => ({
      ...prev,
      [nombre.split(" ").join("%")]: { nombre, jugadores },
    }));
  };

  return (
    <div className="bg-gray-100 border-2 border-green-500 rounded-lg p-4 my-4 shadow-lg">
      <input
        disabled={listo}
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del equipo"
        className="w-full px-3 py-2 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
      />

      <div
        className={`transition-all duration-500 ease-in-out transform ${
          listo ? "scale-y-0 opacity-0 h-0" : "scale-y-100 opacity-100 h-auto"
        } origin-top overflow-hidden`}
      >
        {conJugadores &&
          Array.from({ length: cantidadJugadores }, (_, i) => (
            <input
              disabled={listo}
              key={i}
              type="text"
              name={`jugador${i + 1}`}
              onChange={handleInput}
              placeholder={`Jugador ${i + 1}`}
              className="w-full px-3 py-2 mb-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            />
          ))}
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          checked={listo}
          onChange={(e) => setListo(e.target.checked)}
          className="text-green-600 focus:ring-green-500 cursor-pointer"
        />
        <label className="text-gray-800 font-semibold">Equipo Listo</label>
      </div>
    </div>
  );
}
