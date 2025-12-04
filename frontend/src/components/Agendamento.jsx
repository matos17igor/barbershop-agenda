import { useState } from "react";

export default function Agendamento() {
  const [userId, setUserId] = useState("");
  const [servico, setServico] = useState("");
  const [dataHora, setDataHora] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosAgendamento = {
      userId: Number(userId),
      servico: servico,
      dataHora: dataHora,
    };

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
        throw new Error(erro.error || erro.erro || "Erro ao agendar");
      }

      alert("Agendamento realizado com sucesso! ✂️");

      setUserId("");
      setDataHora("");
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID DO USUÁRIO (Temporário até termos Login) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ID do Usuário
            </label>
            <input
              type="number"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Ex: 1"
              required
            />
          </div>

          {/* SELEÇÃO DE SERVIÇO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Serviço
            </label>
            <select
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={servico}
              onChange={(e) => setServico(e.target.value)}
            >
              <option>Corte de Cabelo</option>
              <option>Barba</option>
              <option>Corte + Barba</option>
              <option>Sobrancelha</option>
            </select>
          </div>

          {/* DATA E HORA */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Data e Hora
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
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
