// src/App.jsx
function App() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-blue-600">
        Barbearia VIP 💈
      </h1>
      <p className="mb-8 text-gray-600">
        Sistema de Agendamento com React + Tailwind
      </p>

      <button className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white hover:bg-blue-700 transition duration-300">
        Agendar Horário
      </button>
    </div>
  );
}

export default App;
