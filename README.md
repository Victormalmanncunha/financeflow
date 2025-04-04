# FinanceFlow

FinanceFlow é um sistema de gerenciamento financeiro desenvolvido com Next.js, React, Prisma e outras tecnologias modernas. O objetivo do projeto é permitir que usuários registrem suas transações financeiras, categorizem-nas e acompanhem seu saldo ao longo do tempo.

## Tecnologias Utilizadas

- **Next.js** - Framework para aplicações React com renderização eficiente.
- **React** - Biblioteca para a construção da interface do usuário.
- **Prisma** - ORM para interação com o banco de dados.
- **TailwindCSS** - Estilização rápida e responsiva.
- **JWT (jsonwebtoken, jose)** - Autenticação segura dos usuários.
- **Bcrypt** - Hashing de senhas para segurança.
- **React Toastify** - Exibição de notificações.
- **Framer Motion** - Animações na interface.

## Funcionalidades

- Cadastro e autenticação de usuários.
- Adição, edição e remoção de transações financeiras.
- Categorização de receitas e despesas.
- Exibição de transações separadas por data.

## Instalação e Uso

1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/financeflow.git
   cd financeflow
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env` e preenchendo os dados necessários:
   ```env
   DATABASE_URL= "sua_url_do_banco"
   JWT_SECRET="sua_chave_secreta"
   ```

4. Execute o banco de dados e aplique as migrações Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Testes

Para rodar os testes automatizados:
```bash
npm run test
```

## Licença

Este projeto é distribuído sob a Licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---
Criado por Victor Malmann da Cunha.

