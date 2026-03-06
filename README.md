# 💈 Barbearia VIP - Sistema de Agendamentos

Um sistema Full Stack de agendamentos para barbearias, desenvolvido para facilitar a marcação de horários entre clientes e administradores. 

Este projeto foi construído do zero, contemplando banco de dados relacional, API RESTful e uma interface moderna e responsiva.

## 🚀 Funcionalidades

O sistema conta com diferentes níveis de acesso (Admin e Cliente), garantindo segurança e uma experiência personalizada:

### 👤 Para Clientes:
- **Cadastro e Login:** Autenticação de usuários para acesso seguro.
- **Edição de Perfil:** Atualização de dados cadastrais (Nome e Email).
- **Novo Agendamento:** Escolha de serviço e data/hora.
  - *Regra de Negócio:* Bloqueio de horários duplicados.
  - *Regra de Negócio:* Exigência de antecedência mínima de 24 horas.
- **Meus Horários:** Painel exclusivo onde o cliente visualiza apenas os seus agendamentos.
- **Cancelamento:** Opção de desmarcar um horário próprio.

### 👑 Para o Administrador:
- **Painel Administrativo:** Visão global de todos os agendamentos da barbearia.
- **Gestão Total:** Capacidade de visualizar dados de contato dos clientes e cancelar qualquer horário, se necessário.
- **Rotas Protegidas:** Área administrativa totalmente bloqueada para usuários comuns (Proteção de Rotas no Frontend).

---

## 💻 Tecnologias Utilizadas

### Frontend
- **React** (com Vite)
- **Tailwind CSS** (Estilização rápida e responsiva)
- **React Router Dom** (Navegação SPA e Rotas Protegidas)
- **React Toastify** (Notificações visuais elegantes)

### Backend
- **Node.js** com **Express** (Criação da API REST)
- **Prisma ORM** (Modelagem e comunicação com o banco de dados)

### Banco de Dados
- **MySQL** (Banco de dados relacional)

---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e um servidor [MySQL](https://www.mysql.com/) (como o XAMPP ou MySQL Workbench).

### 1. Clonando o repositório 
```bash
git clone https://github.com/matos17igor/barbershop-agenda
```
### 2. Configurando o Backend
Entre na pasta do backend
```bash
cd backend
```

Instale as dependências
```bash
npm install
```

### 3. Configurar o Banco de Dados

Crie um arquivo chamado `.env` na raiz da pasta backend e adicione a URL do seu banco de dados MySQL:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/barbearia"
```
Rode as migrations do Prisma para criar as tabelas no banco
```bash
npx prisma migrate dev
```

Inicie o servidor
```bash
npm start
```
O servidor iniciará na porta 3001

### 3. Configurando o Frontend
Abra um novo terminal e entre na pasta do frontend
```bash
cd frontend
```

Instale as dependências
```bash
npm install
```

Inicie a aplicação
```bash
npm run dev
```
O app estará disponível no seu navegador em http://localhost:5173

