# Provi backend challenge
Challenge desenvolvido com **NodeJS + Express** para a empresa Provi.

- Sistema: Form guiado, onde os usuários preenchem suas informações pessoais para solicitar um empréstimo.

## Execução
1. Baixe o arquivo .zip ou clone este repositório em seu terminal;

2. Instale as dependências com o comando
```npm install```;

3. Crie um arquivo ```.env``` e configure as variáveis de ambiente conforme mostrado no arquivo ```.env.example```, com as configurações do seu banco de dados(MySQL);

4. Inicie o servidor local utilizando o comando ```npm run start```;

5. Crie as tabelas no banco de dados, conforme mostrado no arquivo ```tables_db.sql```

## Documentação completa:
- https://documenter.getpostman.com/view/11226481/TVReeB49

## Stack utilizada:
- Git;
- Axios;
- Bcryptjs;
- Date-fns;
- Dotenv;
- Node.js;
- Express;
- Jsonwebtoken;
- Knex;
- MySQL;
- Ts-node-dev;
- Typescript;
- Uuid
    
## Lib utilizada para validar o CPF
- gerador-validador-cpf: https://tiagoporto.github.io/gerador-validador-cpf/
    
## API utilizada para validar o CEP
- Via Cep: https://github.com/viniciussanchez/viacep
