import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao criar!" });
  }
});

app.post("/appointments", async (req, res) => {
  const { userId, servico, dataHora } = req.body;

  try {
    const dateISO = new Date(dataHora);

    const agendamentoExistente = await prisma.appointment.findFirst({
      where: {
        dataHora: dateISO,
      },
    });

    if (agendamentoExistente) {
      return res
        .status(400)
        .json({ erro: "Horario ja ocupado! Escolha outro." });
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId: userId,
        servico: servico,
        dataHora: dateISO,
      },
    });

    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Email ou senha incorretos" });
    }

    res.json({
      id: user.id,
      name: user.name,
      tipo: user.tipo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
