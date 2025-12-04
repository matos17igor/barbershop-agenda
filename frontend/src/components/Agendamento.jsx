import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Agendamento() {
  const [servico, setServico] = useState("Corte de Cabelo");
  const [dataHora, setDataHora] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
      setUsuarioLogado(JSON.parse(usuarioSalvo));
    } else {
      alert("Você precisa entrar para agendar!");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosAgendamento = {
      userId: usuarioLogado.id,
      servico: servico,
      dataHora: dataHora,
    };

    if (!usuarioLogado) return;

    try {
      const resposta = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosAgendamento),
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        throw new Error(erro.error || "Erro ao agendar");
      }

      alert(`Agendamento confirmado para ${usuarioLogado.name}! ✂️`);
      setDataHora(""); // Limpa só a data
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
          Agendar Horário ✂️
        </h2>

        {usuarioLogado && (
          <p className="mb-4 text-center text-gray-600">
            Agendando para: <strong>{usuarioLogado.name}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* REMOVEMOS O CAMPO DE ID DO USUÁRIO DAQUI */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serviço
            </label>
            <select
              className="w-full p-2 mt-1 border rounded-md bg-white"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
            >
              <option>Corte de Cabelo</option>
              <option>Barba</option>
              <option>Corte + Barba</option>
              <option>Sobrancelha</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data e Hora
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 mt-1 border rounded-md"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white transition bg-green-600 rounded-md hover:bg-green-700"
          >
            Confirmar Agendamento
          </button>
        </form>
      </div>
    </div>
  );
}
