import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// components
import Cadastro from "./components/Cadastro";
import Agendamento from "./components/Agendamento";
import Login from "./components/Login";
import Admin from "./components/Admin";
import RotaProtegida from "./components/RotaProtegida";
import MeusAgendamentos from "./components/MeusAgendamentos";

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  // Quando o App abre, verifica se já tem alguém salvo no navegador
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  // Função de Sair
  const handleLogout = () => {
    localStorage.removeItem("usuario"); // Apaga do navegador
    setUsuario(null); // Apaga da memória do React
    navigate("/"); // Manda de volta pra tela de login
  };

  return (
    <div>
      <nav className="flex items-center justify-between p-4 mb-4 text-white bg-blue-600 shadow-md">
        <h1 className="text-xl font-bold">💈 Barbearia VIP</h1>

        <div className="flex items-center gap-4">
          {usuario ? (
            <>
              <span className="text-sm font-light mr-2">
                Olá, {usuario.name}
              </span>

              {usuario.tipo === "admin" ? (
                // SE FOR ADMIN:
                <Link
                  to="/admin"
                  className="hover:text-blue-200 font-bold mr-4"
                >
                  Painel
                </Link>
              ) : (
                <>
                  <Link
                    to="/agendar"
                    className="hover:text-blue-200 font-bold mr-4"
                  >
                    Novo Agendamento
                  </Link>
                  <Link
                    to="/meus-agendamentos"
                    className="hover:text-blue-200 font-bold mr-4"
                  >
                    Meus Horários
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-1 text-red-600 bg-white rounded hover:bg-gray-100 font-bold text-sm"
              >
                Sair
              </button>
            </>
          ) : (
            // NÃO LOGADO
            <>
              <Link to="/" className="hover:text-blue-200 mr-4">
                Login
              </Link>
              <Link to="/cadastro" className="hover:text-blue-200">
                Cadastro
              </Link>
            </>
          )}
        </div>
      </nav>

      <div className="container p-4 mx-auto">
        <Routes>
          <Route path="/" element={<Login onLogin={setUsuario} />} />
          <Route path="/cadastro" element={<Cadastro />} />

          <Route
            path="/agendar"
            element={
              <RotaProtegida>
                <Agendamento />
              </RotaProtegida>
            }
          />

          <Route
            path="/meus-agendamentos"
            element={
              <RotaProtegida>
                <MeusAgendamentos />
              </RotaProtegida>
            }
          />

          <Route
            path="/admin"
            element={
              <RotaProtegida nivelExigido="admin">
                <Admin />
              </RotaProtegida>
            }
          />
        </Routes>
      </div>

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}

export default App;
