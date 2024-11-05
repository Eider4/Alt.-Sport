import { useNavigate } from "react-router-dom";

function Headers() {
  const navigate = useNavigate();
  return (
    <div>
      Bienvenido
      <nav>
        <li onClick={() => navigate("/mostrar-equipos")}>mostrar equipos</li>
      </nav>
    </div>
  );
}

export default Headers;
