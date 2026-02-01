import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      setNome(usuario.name);
      setEmail(usuario.email);
    }
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    try {
      const resposta = await fetch(
        `http://localhost:3001/users/${usuarioSalvo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nome,
            email: email,
          }),
        }
      );

      if (!resposta.ok) {
        throw new Error("Erro ao atualizar perfil");
      }

      const dadosAtualizados = await resposta.json();

      // Mantemos o token ou tipo se existirem, e atualizamos os dados
      const novoUsuarioParaSalvar = {
        ...usuarioSalvo, // Mantém ID, tipo, etc.
        name: dadosAtualizados.name,
        email: dadosAtualizados.email,
      };

      localStorage.setItem("usuario", JSON.stringify(novoUsuarioParaSalvar));

      toast.success("Perfil atualizado com sucesso!");

      window.location.reload();
    } catch (error) {
      toast.error("Erro: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
          Meu Perfil 👤
        </h2>

        <form onSubmit={handleSalvar} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-md"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-md bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white transition bg-yellow-500 rounded-md hover:bg-yellow-600"
          >
            Salvar Alterações
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)} // Volta para a página anterior
            className="w-full py-2 mt-2 font-bold text-gray-600 transition bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
