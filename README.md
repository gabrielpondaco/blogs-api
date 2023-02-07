# Blogs API

# Contexto
Neste projeto foi desenvolvida uma API e um banco de dados para a produção de conteúdo para um blog!

Trata-se de uma aplicação em Node.js usando o pacote sequelize para fazer um CRUD de posts.

Contendo endpoints que estão conectados ao banco de dados seguindo os princípios do REST;

Para fazer um post é necessário usuário e login.

Existem categorias para os posts, trabalhando, assim, a relação de posts para categories e de categories para posts.

## Técnologias usadas

> Desenvolvido usando: NodeJS, ExpressJS, MYSQL, JWT, Joi


## Orientações para a Execução:

<details>
  <summary><strong>Com Docker</strong></summary><br />
  
  - Execute o serviço `node` com o comando `docker-compose up -d`, para inicializar o container `blogs_api` e outro chamado `blogs_api_db`.
  - Rode o comando `docker exec -it blogs_api bash` para acessar o terminal interativo do container.
  - Instale as dependências com `npm install` .
</details>

<details>
  <summary><strong>Localmente</strong></summary><br />
  
  - Necessário o `node` instalado.
  - Instale as dependências com `npm install`.
</details>

<details>
  <summary><strong>Scripts para o banco</strong></summary><br />
  
  - Deleta o banco de dados:
    ```json
    "npm run drop"
    ```

- Cria o banco e gera as tabelas:
    ```json
    "npm run prestart"
    ```

- Insere dados/Popula a tabela:
    ```json
    "npm run seed"
</details>

<details>
  <summary><strong>Testando as rotas</strong></summary><br />
  
  -Necessário login para obter o token;
  
  -Utilize o token nos headers das requisições para permissão;
</details>

  
