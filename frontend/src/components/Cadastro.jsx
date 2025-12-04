import { useState } from "react";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosCadastro = {
      name: nome,
      email: email,
      password: senha,
    };

    try {
      const resposta = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCadastro),
      });

      if (!resposta.ok) {
        const erroData = await resposta.json();
        throw new Error(erroData.error || "Erro ao cadastrar");
      }

      alert("Usuário cadastrado com sucesso! 🚀");

      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-blue-600">
          Crie sua conta 💈
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="******"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 font-bold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
