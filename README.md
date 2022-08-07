# Microserviço de autenticação com Nodejs

Projeto desenvolvido com os conhecimentos adquiridos no bootcamp Impulso JavaScript da [DIO](https://digitalinnovation.one/)

## Principais Ferramentas
* TypeScript
* NodeJS
* Express
* http-status-codes
* jsonwebtoken
* pg (banco de dados postgress)

## Configuração do Banco de dados e Chave de autenticação
O db foi criado na nuvem, utilizando o serviço gratuito do [ElephantSQL](https://customer.elephantsql.com/)
Para configurar o database criado no ElephantSQL basta adionar a URL gerada no site dentro do arquivo
de configuração conforme o exemplo abaixo:

```bash
$ "database": {
$      "uri": 'postgres://xxxxx:xxxxxx@xxxxxx/xxxxx'
$ }
```

E a sua chave de autenticação:
```bash
$ "authentication": {
$        "cryptKey": "AUTHENTICATION_CRYPT_KEY"
$ }
```

## Composição do projeto

Neste projeto Temos alguns **Endpoints Base** que podem ser extendidos da forma mais adequada para seu contexto. 

São eles:

### Usuários

* GET /users
* GET /users/:uuid
* POST /users
* PUT /users/:uuid
* DELETE /users/:uuid

### Autenticação

* POST /token
* POST /token/validate

## Inicializar Servidor
```bash
$ npm install 
```

```bash
$ npm run dev 
```

## Links úteis

* [Documentação da biblioteca pg](https://node-postgres.com/api/pool)
* [Documentação do Express](http://expressjs.com/en/starter/installing.html) 
* [Documentação do JSON Web tokens](https://jwt.io/introduction) 
* [Documentação do http-status-codes](https://npm.io/package/http-status-codes) 
* [Documentação do TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) 
* [Documentação do NodeJS](https://nodejs.org/api/) 
