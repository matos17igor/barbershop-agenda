// imports
import Cadastro from "./components/Cadastro";
import Agendamento from "./components/Agendamento";
import Login from "./components/Login";
import Admin from "./components/Admin";

// routes
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="flex justify-between p-4 mb-4 text-white bg-blue-600 shadow-md">
        <h1 className="text-xl font-bold">💈 Barbearia VIP</h1>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-blue-200">
            Login
          </Link>
          <Link to="/cadastro" className="hover:text-blue-200">
            Cadastro
          </Link>
        </div>
      </nav>

      <div className="container p-4 mx-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/agendar" element={<Agendamento />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
