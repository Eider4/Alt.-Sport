import { useEffect, useState } from "react";
import useStoreUsuario from "../../store/manageUser";

export default function UnEquipo({ cantidadJugadores, conJugadores }) {
  const [nombre, setNombre] = useState("");
  const [jugadores, setJugadores] = useState({});
  const [listo, setListo] = useState(false);
  const [error, setError] = useState("");
  const equipos = useStoreUsuario((state) => state.usuario.equipos);
  const [Enviado, setEnviado] = useState(false);
  const addequipo = useStoreUsuario((state) => state.addEquipo);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setJugadores((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (error != "")
      setTimeout(() => {
        setError("");
        return () => {};
      }, 2000);
  }, [error]);

  const guardarEquipo = () => {
    console.log(nombre, jugadores, listo, error);
    const nombreProcesado = nombre.split(" ").join("%").toLowerCase();
    if (!nombre) {
      setError("Debes ingresar el nombre");
      return;
    }
    if (conJugadores && Object.values(jugadores).some((item) => !item)) {
      setError("Debes ingresar todos los jugadores");
      return;
    }
    if (!listo) {
      setError("Confirma que el equipo está listo");
      return;
    }
    addequipo({ id: nombreProcesado, object: { nombre, jugadores } });
    setEnviado(true);
  };

  if (Enviado) return null;

  return (
    <div>
      <div className="bg-gray-100 border-2 border-green-500 rounded-lg p-6 my-4 shadow-lg transform transition duration-500 ease-in-out hover:scale-105">
        <input
          disabled={listo}
          type="text"
          value={nombre}
          onChange={(e) => {
            const nombreProcesado = e.target.value
              .split(" ")
              .join("%")
              .toLowerCase();
            if (Object.keys(equipos).some((item) => item === nombreProcesado)) {
              setError("Ese nombre ya existe");
              setTimeout(() => {
                setError("");
              }, 2000);
              setNombre("");
              return;
            }
            setNombre(e.target.value);
          }}
          placeholder="Nombre del equipo"
          className="w-full px-4 py-3 mb-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
        />
        <p className="text-red-600 font-semibold mb-2 transition-opacity duration-500 ease-in-out">
          {error}
        </p>
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
                className="w-full px-4 py-2 mb-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              />
            ))}
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={listo}
            onChange={(e) => setListo(e.target.checked)}
            className="text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer transition-all duration-200"
          />
          <label className="text-gray-800 font-semibold">Equipo Listo</label>
        </div>
        <input
          onClick={guardarEquipo}
          type="button"
          value="Registrar Equipo"
          className="w-full bg-green-700 text-white py-3 rounded-lg shadow-md hover:bg-green-800 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
        />
      </div>
    </div>
  );
}
