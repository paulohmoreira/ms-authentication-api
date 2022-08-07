import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import statusRoute from "./routes/status.route";
import usersRoute from "./routes/users.route";
import authorizationRoute from "./routes/authorization.route";
import jwtAuthenticationMiddleware from "./middlewares/jwt-authentication.middleware";

const app = express();

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware);
app.use(usersRoute);

// Configuração dos Handler de Erro?
app.use(errorHandler);

// Inicialização do servidor
app.listen(3000, () => {
  console.log("Aplicação executando na porta 3000");
});
