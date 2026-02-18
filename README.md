# Identity Service API

API REST para gerenciamento de usuários com autenticação JWT, controle de permissões e recuperação de senha.

Projeto desenvolvido com foco em segurança, organização de arquitetura e integridade de dados.

---

## 🚀 Stack

- Node.js
- Express
- Knex
- MySQL
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv
- Crypto

---

## 🏗️ Arquitetura

Estrutura organizada por separação de responsabilidades:

- Controllers → Camada de entrada (req / res)
- Database → Configuração do Knex e queries
- Middlewares → Autenticação e autorização
- Utils → Funções auxiliares

---

## 🔐 Autenticação

A API utiliza JWT via header:

```
Authorization: Bearer <token>
```

- Token com tempo de expiração configurável
- Tratamento de token inválido
- Tratamento de token expirado
- Diferenciação entre:
  - 401 → Não autenticado
  - 403 → Sem permissão

---

## 📂 Endpoints

### 🔹 POST /login  
Autenticação de usuário

**Body:**

```json
{
  "email": "user@email.com",
  "password": "123"
}
```

**Response:**

```json
{
  "data": {
    "accessToken": "jwt",
    "expiresIn": 7200
  }
}
```

---

### 🔹 POST /user  
Criação de usuário  
🔒 Requer autenticação

```json
{
  "name": "Nome",
  "email": "email@email.com",
  "password": "12345",
  "role": 0
}
```

---

### 🔹 GET /user  
Listar usuários  
🔒 Requer autenticação

---

### 🔹 GET /user/:id  
Buscar usuário por ID  
🔒 Requer autenticação

---

### 🔹 PUT /user  
Atualizar usuário  
🔒 Requer autenticação

```json
{
  "id": 1,
  "name": "Novo Nome",
  "email": "novo@email.com",
  "role": 1
}
```

---

### 🔹 DELETE /user/:id  
Remover usuário  
🔒 Requer autenticação

---

### 🔹 POST /recoverPassword  
Gerar token de recuperação de senha

```json
{
  "email": "user@email.com"
}
```

- Gera token único
- Armazena no banco
- Controle de uso e expiração

---

### 🔹 POST /changePassword  
Alterar senha via token

```json
{
  "token": "uuid-token",
  "password": "novaSenha"
}
```

- Validação de token
- Verificação de uso
- Atualização protegida por transação
- Uso de commit / rollback para garantir integridade

---

## 🧠 Conceitos Aplicados

- Hash de senha com bcrypt
- Transações com Knex
- Relacionamento entre tabelas
- Padronização de responses (`data` / `error`)
- Separação de camadas
- Tratamento correto de status HTTP
- Controle de autenticação vs autorização
- Uso de variáveis de ambiente com dotenv

---

## ⚙️ Configuração do Projeto

### 1️⃣ Clonar repositório

```bash
https://github.com/WesleyAzevedoGomes/users-api-knex.git
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Criar arquivo `.env`

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=users_api
SECRET_JWT=sua_chave_secreta
```

## 📈 Objetivo do Projeto

Consolidar fundamentos sólidos de backend:

- Segurança
- Integridade de dados
- Organização arquitetural
- Previsibilidade de comportamento da API
- Boas práticas REST

---

Desenvolvido por Wesley Azevedo 
