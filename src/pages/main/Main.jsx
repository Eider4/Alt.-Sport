import { useNavigate } from "react-router-dom";
import { torneos } from "../../utils/torneos";
import Headers from "../../sections/headers/Headers";

export default function Main() {
  const navigate = useNavigate();
  const usuario = sessionStorage.getItem("usuario");

  if (!usuario)
    return (
      <div className="flex justify-center items-center h-screen bg-green-100">
        <button
          onClick={() => navigate("/login")}
          className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          Registrarse
        </button>
      </div>
    );

  return (
    <div className="bg-green-50 min-h-screen">
      <header className="bg-green-800 p-4 text-center">
        <Headers />
      </header>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {torneos.map((torneo) => (
          <div
            key={torneo.id}
            onClick={() => navigate("/registrar-equipos")}
            className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border border-green-300 p-4"
          >
            <h2 className="text-green-800 font-bold text-lg mb-2 text-center">
              {torneo.nombre}
            </h2>
            <p className="text-gray-600 text-sm mb-4 text-center">
              {torneo.descripcion}
            </p>
            <div className="flex justify-center">
              <img
                src={torneo.img}
                alt={torneo.nombre}
                className="h-20 w-20 object-cover rounded-full border border-green-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
