import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function MeusAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  async function carregarMeusAgendamentos() {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (!usuarioSalvo) return;

    const usuario = JSON.parse(usuarioSalvo);

    try {
      const resposta = await fetch(
        `http://localhost:3001/appointments/user/${usuario.id}`
      );

      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.error || "Erro ao buscar dados");
      }
      setAgendamentos(dados);
    } catch (error) {
      toast.error("Erro ao carregar agenda");
    }
  }

  async function cancelar(id) {
    if (!confirm("Quer mesmo cancelar?")) return;

    try {
      const resposta = await fetch(`http://localhost:3001/appointments/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        setAgendamentos(agendamentos.filter((item) => item.id !== id));
        toast.success("Agendamento cancelado!");
      } else {
        toast.error("Erro ao cancelar.");
      }
    } catch (error) {
      toast.error("Erro de conexão.");
    }
  }

  useEffect(() => {
    carregarMeusAgendamentos();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Meus Horários ✂️
      </h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4">Serviço</th>
              <th className="p-4">Data e Hora</th>
              <th className="p-4">Ação</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  Você ainda não tem agendamentos.
                </td>
              </tr>
            ) : (
              agendamentos.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.servico}</td>
                  <td className="p-4">
                    {new Date(item.dataHora).toLocaleString("pt-BR")}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => cancelar(item.id)}
                      className="px-3 py-1 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-700"
                    >
                      Desmarcar
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
