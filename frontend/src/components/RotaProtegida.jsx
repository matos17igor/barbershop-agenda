import { Navigate } from "react-router-dom";

export default function RotaProtegida({ children, nivelExigido }) {
  const usuarioSalvo = localStorage.getItem("usuario");

  if (!usuarioSalvo) {
    return <Navigate to="/" />;
  }

  const usuario = JSON.parse(usuarioSalvo);

  if (nivelExigido === "admin" && usuario.tipo !== "admin") {
    return <Navigate to="/agendar" />;
  }

  return children;
}
