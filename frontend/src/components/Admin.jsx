import { useEffect, useState } from "react";

export default function Admin() {
  const [agendamentos, setAgendamentos] = useState([]);

  async function carregarAgenda() {
    try {
      const resposta = await fetch("http://localhost:3001/appointments");
      const dados = await resposta.json();
      setAgendamentos(dados);
    } catch (error) {
      alert("Erro ao carregar agenda");
    }
  }

  useEffect(() => {
    carregarAgenda();
  }, []);

  async function excluirAgendamento(id) {
    if (!confirm("Tem certeza que deseja cancelar esse agendamento?")) {
      return;
    }

    try {
      const resposta = await fetch(`http://localhost:3001/appointments/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        setAgendamentos(agendamentos.filter((item) => item.id !== id));
        alert("Agendamento cancelado!");
      } else {
        alert("Erro ao cancelar.");
      }
    } catch (error) {
      alert("Erro de conexao.");
    }
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Painel Administrativo ✂️
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4">Serviço</th>
              <th className="p-4">Data e Hora</th>
              <th className="p-4">Contato (Email)</th>
              <th className="p-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Nenhum agendamento encontrado.
                </td>
              </tr>
            ) : (
              agendamentos.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.user.name}</td>
                  <td className="p-4">{item.servico}</td>
                  <td className="p-4">
                    {/* Formata a data para ficar legível em PT-BR */}
                    {new Date(item.dataHora).toLocaleString("pt-BR")}
                  </td>
                  <td className="p-4 text-gray-600">{item.user.email}</td>
                  <td className="p-4">
                    <button
                      onClick={() => excluirAgendamento(item.id)}
                      className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-700 transition"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
