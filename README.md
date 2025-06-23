# 🌐 Twitter Clone - Frontend

> ⚠️ **Aviso:** Este é apenas o frontend do projeto. O backend está disponível em:  
> 🔗 [Repositório do Backend](https://github.com/lllleao/backend_ebac.git)

Este é o frontend de um clone simplificado do Twitter, desenvolvido com **React 19**, **Vite** e **TypeScript**. Ele consome uma API REST desenvolvida com Django no backend e oferece uma interface amigável para os usuários interagirem com o sistema.

---

## ✨ Funcionalidades

- Cadastro e login de usuários
- Listagem e criação de **posts**
- Criação de **comentários**
- Exclusão de posts e comentários
- Visualização e edição do **perfil do usuário**, incluindo:
  - Atualização de avatar
  - Edição da bio
- Navegação por rotas (SPA)

---

## 🛠️ Tecnologias e Bibliotecas

### ⚙️ Stack principal

| Tecnologia        | Versão     | Função principal                                 |
|-------------------|------------|--------------------------------------------------|
| **React**         | ^19.0.0    | Biblioteca principal de construção da UI         |
| **Vite**          | ^6.3.1     | Bundler e servidor de desenvolvimento            |
| **TypeScript**    | ~5.7.2     | Tipagem estática para JavaScript                 |
| **React Router**  | ^7.5.2     | Gerenciamento de rotas                           |
| **Styled Components** | ^6.1.17 | Estilização com CSS-in-JS                        |
| **Axios**         | ^1.9.0     | Requisições HTTP                                 |
| **UUID**          | ^11.1.0    | Geração de IDs únicos (por exemplo, para chaves) |

---

### 💻 Dev Tools

- **ESLint + Prettier** — Linting e formatação de código
- **@vitejs/plugin-react** — Integração do Vite com o React
- **React Refresh** — Hot reload para desenvolvimento

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/lllleao/frontend_ebac.git
cd frontend_ebac

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
