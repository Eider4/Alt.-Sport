import { useState } from "react";
import useStoreUsuario from "../../store/manageUser";
import { useNavigate } from "react-router-dom";

function Login() {
  const [nombre, setNombre] = useState("");
  const createUser = useStoreUsuario((state) => state.createUser);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(nombre);
    localStorage.setItem("usuario", JSON.stringify(nombre));
    navigate("/");
  };
  if (localStorage.getItem("usuario"))
    return <button onClick={() => navigate("/")}>Ya estas Registrado</button>;
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
            type="text"
            placeholder="Nombre"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
