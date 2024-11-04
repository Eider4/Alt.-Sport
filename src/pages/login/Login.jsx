import { useState } from "react";
import useStoreUsuario from "../../store/manageUser";

function Login() {
  const [nombre, setNombre] = useState("");
  const createUser = useStoreUsuario((state) => state.createUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(nombre);
    sessionStorage.setItem("usuario", JSON.stringify(nombre));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
          type="text"
          placeholder="Nombre"
        />
        <input type="submit" placeholder="Guardar" />
      </form>
    </div>
  );
}

export default Login;
