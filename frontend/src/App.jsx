import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; // <--- Importe useEffect e useState
import Cadastro from "./components/Cadastro";
import Agendamento from "./components/Agendamento";
import Login from "./components/Login";
import Admin from "./components/Admin";

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

  // 2. Função de Sair
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
              <span className="text-sm font-light">Olá, {usuario.name}</span>

              {usuario.tipo === "admin" ? (
                <Link to="/admin" className="hover:text-blue-200 font-bold">
                  Painel
                </Link>
              ) : (
                <Link to="/agendar" className="hover:text-blue-200 font-bold">
                  Agendar
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-1 text-red-600 bg-white rounded hover:bg-gray-100 font-bold text-sm"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-blue-200">
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
          {/* Passamos a função setUsuario para o Login poder avisar quando entrar */}
          <Route path="/" element={<Login onLogin={setUsuario} />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/agendar" element={<Agendamento />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
