import Cadastro from "./components/Cadastro";
import Agendamento from "./components/Agendamento";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="flex justify-between p-4 mb-4 text-white bg-blue-600 shadow-md">
        <h1 className="text-xl font-bold">💈 Barbearia VIP</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Cadastro
          </Link>
          <Link to="/agendar" className="hover:text-blue-200">
            Agendar
          </Link>
        </div>
      </nav>

      <div className="container p-4 mx-auto">
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/agendar" element={<Agendamento />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
