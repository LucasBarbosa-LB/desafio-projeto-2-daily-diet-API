## Instalação e inicialização

```bash
# Faça o clone do repotório
Após clonar esse repositório faça os proximos passos.
# Instalar as dependências do projeto
  npm install

# Executando o projeto no ambiente de desenvolvimento
  npm run dev
  
# Rodar as migrations do projeto para criar o banco de dados
  npm run knex -- migrate:latest
```

# RF

- [x] Deve ser possível criar um usuário;
- [x] Deve ser possível registrar uma refeição feita;
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados dela;
- [x] Deve ser possível apagar uma refeição;
- [x] Deve ser possível listar todas as refeições de um usuário;
- [x] Deve ser possível visualizar uma única refeição;
- [x] Deve ser possível recuperar as métricas de um usuário;

# RN

- [x] Deve ser possível identificar o usuário entre as requisições;
- [x] O usuário só pode visualizar, editar e apagar refeições as quais ele criou;