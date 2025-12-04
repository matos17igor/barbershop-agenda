import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!resposta.ok) {
        alert("Email ou senha inválidos! ❌");
        return;
      }

      const usuario = await resposta.json();

      // Salva o usuário no navegador para não perder se atualizar a página
      localStorage.setItem("usuario", JSON.stringify(usuario));

      alert(`Bem-vindo, ${usuario.name}!`);

      // === AQUI ACONTECE O REDIRECIONAMENTO ===
      if (usuario.tipo === "admin") {
        navigate("/admin"); // Barbeiro vai para o painel
      } else {
        navigate("/agendar"); // Cliente vai para o agendamento
      }
    } catch (error) {
      alert("Erro ao conectar no servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
          Faça seu Login 🔐
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-md"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
