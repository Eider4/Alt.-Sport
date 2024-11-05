import { useNavigate, useParams } from "react-router-dom";
import useStoreUsuario from "../../store/manageUser";
import { useState, useEffect } from "react";

export default function MostrarEquipos() {
  const equipos = useStoreUsuario((state) => state.usuario.equipos);
  const eliminarEquipo = useStoreUsuario((state) => state.eliminarEquipo);
  const [seleccionar, setSeleccionar] = useState(false);
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);
  const [EquiposSeleccionados, setEquiposSeleccionados] = useState([]);
  const navigate = useNavigate();
  const { tipoTorneo } = useParams();

  if (!localStorage.getItem("usuario"))
    return (
      <div className="flex justify-center items-center h-screen bg-green-100">
        <button onClick={() => navigate("/login")}>Registrarse</button>
      </div>
    );

  if (Object.keys(equipos).length <= 0)
    return (
      <div className="flex justify-center items-center h-screen bg-green-100">
        <button onClick={() => navigate("/registrar-equipos")}>
          Registrar Equipos
        </button>
      </div>
    );

  // Maneja la selección de un equipo individual
  const seleccionado = (e, key) => {
    const agregar = e.target.checked;
    if (agregar) {
      setEquiposSeleccionados((prev) => [...prev, key]);
    } else {
      setEquiposSeleccionados((prev) => prev.filter((item) => item !== key));
    }
  };

  // Maneja la selección de todos los equipos
  const seleccionarTodos = (e) => {
    const allSelected = e.target.checked;
    setSeleccionarTodo(allSelected);
    if (allSelected) {
      setEquiposSeleccionados(Object.keys(equipos).filter((key) => key !== ""));
    } else {
      setEquiposSeleccionados([]);
    }
  };
  console.log(EquiposSeleccionados);
  // Actualiza el estado de selección individual cuando se activa "Seleccionar todos"
  useEffect(() => {
    if (seleccionarTodo) {
      setEquiposSeleccionados(Object.keys(equipos).filter((key) => key !== ""));
    } else {
      setEquiposSeleccionados([]);
    }
  }, [seleccionarTodo, equipos]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
        Lista de Equipos
      </h1>
      <button onClick={() => navigate("/registrar-equipos")}>
        Agregar Equipos
      </button>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={seleccionar}
          onChange={(e) => setSeleccionar(e.target.checked)}
          className="mr-2 text-green-600 focus:ring focus:ring-green-200"
        />
        <label className="text-gray-700">Seleccionar</label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={seleccionarTodo}
          onChange={seleccionarTodos}
          className="mr-2 text-green-600 focus:ring focus:ring-green-200"
        />
        <label className="text-gray-700">Seleccionar todos</label>
      </div>
      <button
        onClick={() => {
          localStorage.setItem(
            "equiposEnJuego",
            JSON.stringify(EquiposSeleccionados)
          );
          navigate(`/comenzar-torneo/${tipoTorneo}`);
        }}
      >
        Comenzar torneo
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(equipos).map(([key, equipo]) => {
          if (key === "") return null;
          return (
            <div
              key={key}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-auto"
            >
              {seleccionar && (
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={EquiposSeleccionados.includes(key)}
                    onChange={(e) => seleccionado(e, key)}
                    className="mr-2 text-green-600 focus:ring focus:ring-green-200"
                  />
                  <label className="text-gray-700">Seleccionar</label>
                </div>
              )}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {equipo.nombre}
              </h2>

              <div className="space-y-2">
                {Object.values(equipo.jugadores).map((jugador, index) => (
                  <p
                    key={index}
                    className="text-gray-700 bg-green-100 px-4 py-2 rounded-md"
                  >
                    {jugador}
                  </p>
                ))}
              </div>
              <button onClick={() => eliminarEquipo(key)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
