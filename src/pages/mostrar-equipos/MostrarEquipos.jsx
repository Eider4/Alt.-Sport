import { useNavigate, useParams } from "react-router-dom";
import useStoreUsuario from "../../store/manageUser";
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaPlay,
  FaTrashAlt,
  FaCheckSquare,
  FaRegSquare,
} from "react-icons/fa"; // Iconos de react-icons

export default function MostrarEquipos() {
  const equipos = useStoreUsuario((state) => state.usuario.equipos);
  const eliminarEquipo = useStoreUsuario((state) => state.eliminarEquipo);
  const [seleccionar, setSeleccionar] = useState(false);
  const [seleccionarTodo, setSeleccionarTodo] = useState(false);
  const [EquiposSeleccionados, setEquiposSeleccionados] = useState([]);
  const [Error, setError] = useState("");
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
  useEffect(() => {
    if (seleccionarTodo) {
      setSeleccionar(true);
    }
  }, [seleccionarTodo]);
  useEffect(() => {
    if (
      EquiposSeleccionados.length !=
      Object.keys(equipos).filter((key) => key !== "").length
    ) {
      setSeleccionarTodo(false);
    }
    if (
      EquiposSeleccionados.length ===
      Object.keys(equipos).filter((key) => key !== "").length
    ) {
      setSeleccionarTodo(true);
    }
  }, [EquiposSeleccionados]);

  const seleccionado = (e, key) => {
    const agregar = e.target.checked;
    if (agregar) {
      setEquiposSeleccionados((prev) => [...prev, key]);
    } else {
      setEquiposSeleccionados((prev) => prev.filter((item) => item !== key));
    }
  };

  const seleccionarTodos = (e) => {
    const allSelected = e.target.checked;

    setSeleccionarTodo(allSelected);
    if (allSelected) {
      setEquiposSeleccionados(Object.keys(equipos).filter((key) => key !== ""));
    }
  };
  useEffect(() => {
    if (seleccionarTodo) {
      setEquiposSeleccionados(Object.keys(equipos).filter((key) => key !== ""));
    }
  }, [seleccionarTodo, equipos]);

  return (
    <div className=" bg-gray-100 min-h-screen">
      <nav className="bg-green-50 shadow-md  p-4  fixed w-full">
        <h1 className="text-3xl font-bold text-center mb-4 text-green-600">
          Lista de Equipos
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Botón Agregar Equipos */}
          <button
            onClick={() => navigate("/registrar-equipos")}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            <FaPlus className="mr-2" /> Agregar Equipos
          </button>

          {/* Checkbox Seleccionar */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={seleccionar}
              onChange={(e) => setSeleccionar(e.target.checked)}
              className="mr-2 text-green-600 focus:ring focus:ring-green-200"
            />
            <label className="text-gray-700 flex items-center">
              Seleccionar
            </label>
          </div>

          {/* Checkbox Seleccionar todos */}
          <div className="flex items-center">
            <div
              onClick={() =>
                seleccionarTodo
                  ? setEquiposSeleccionados([])
                  : console.log(seleccionarTodo)
              }
            >
              <input
                type="checkbox"
                checked={seleccionarTodo}
                onChange={seleccionarTodos}
                className=" text-green-600 focus:ring focus:ring-green-200"
              />
            </div>
            <label className="text-gray-700 flex items-center ml-2">
              Seleccionar todos
            </label>
          </div>
          <p>Equipos seleccionados: {EquiposSeleccionados.length}</p>
          {/* Botón Comenzar Torneo */}
          <button
            onClick={() => {
              if (
                EquiposSeleccionados.length > 6 &&
                tipoTorneo == "5ed10018-54bd-47fb-bd94-371ff72ef76b"
              )
                return setError("Debes ingresar solo 6 equipos");
              if (
                EquiposSeleccionados.length < 6 &&
                tipoTorneo == "5ed10018-54bd-47fb-bd94-371ff72ef76b"
              )
                return setError("Debes ingresar 6 equipos");

              localStorage.setItem(
                tipoTorneo,
                JSON.stringify(EquiposSeleccionados)
              );
              navigate(`/comenzar-torneo/${tipoTorneo}`);
            }}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            <FaPlay className="mr-2" /> Comenzar torneo
          </button>
          <p>{Error}</p>
        </div>
      </nav>{" "}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
          Lista de Equipos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(equipos).map(([key, equipo]) => {
            if (key === "") return null;

            return (
              <div
                key={key}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center mb-4">
                  {seleccionar && (
                    <input
                      type="checkbox"
                      checked={EquiposSeleccionados.includes(key)}
                      onChange={(e) => seleccionado(e, key)}
                      className="mr-2 text-green-600 focus:ring focus:ring-green-200"
                    />
                  )}
                  <label className="text-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800  flex items-center">
                      {equipo.nombre}
                    </h2>
                  </label>
                </div>

                <div className="space-y-2 mb-4">
                  {Object.values(equipo.jugadores).map((jugador, index) => (
                    <p
                      key={index}
                      className="text-gray-700 bg-green-100 px-4 py-2 rounded-md hover:bg-green-200 transition duration-200"
                    >
                      {jugador}
                    </p>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => eliminarEquipo(key)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 flex items-center"
                  >
                    <FaTrashAlt className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
