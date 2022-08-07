import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";
import JWT from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes";
import basicAuthenticationMiddleware from "../middlewares/basic-authenctication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

const authorizationRoute = Router();

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user;
    if (!user) {
        throw new ForbiddenError("Usuário não informado");
        
    }

    const jwtPayload = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = 'my_secret_key';
    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
    response.status(StatusCodes.OK).json({ token: jwt });
});

authorizationRoute.post('/token/validade', jwtAuthenticationMiddleware, (request: Request, response: Response, next: NextFunction) => {
    response.sendStatus(StatusCodes.OK);
});

export default authorizationRoute;