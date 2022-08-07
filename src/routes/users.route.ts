import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../repositories/user.repository';

// Rotas a serem criadas:
//
// get /users
// get /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const usersRoute = Router();

usersRoute.get('/users', async (request: Request, response: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    response.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', async (request: Request<{uuid: string}>, response: Response, next: NextFunction)=> {
    try {
        const uuid = request.params.uuid;
        const user = await userRepository.findById(uuid);
        response.status(StatusCodes.OK).send(user);
    } catch (error) {
        next(error);
    }
    
    
});

usersRoute.post('/users', async (request: Request, response: Response, next: NextFunction) => {
    const newUser = request.body;
    const uuid = await userRepository.create(newUser);
    response.status(StatusCodes.CREATED).send(uuid);
});

usersRoute.put('/users/:uuid', async (request: Request<{uuid: string}>, response: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    const modifiedUser = request.body;
    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);

    response.status(StatusCodes.OK).send();
});

usersRoute.delete('/users/:uuid', async (request: Request<{uuid: string}>, response: Response, next: NextFunction) => {
    const uuid = request.params.uuid;
    await userRepository.remove(uuid);

    response.sendStatus(StatusCodes.OK);
});

export default usersRoute;