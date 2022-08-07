import { Request, Response, NextFunction } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from "jsonwebtoken";
import userRepository from "../repositories/user.repository";

export default async function jwtAuthenticationMiddleware(request: Request, response: Response, next: NextFunction
) {
  try {
    const authorizationHeader = request.headers["authorization"];
    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas!");
    }

    const [authenticationType, token] = authorizationHeader.split(" ");
    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválido");
    }

    try {
        const tokenPayload = JWT.verify(token, "my_secret_key");
        if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
            throw new Error("Token inválido");
        }
      
        const user = { uuid: tokenPayload.sub, username: tokenPayload.username };
        request.user = user;
        next();
    } catch (error) {
        throw new Error("Token inválido");
    }
    
  } catch (error) {
    next(error);
  }
}
