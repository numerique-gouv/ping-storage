import Joi from 'joi';
import { buildUserController } from '../modules/user';
import { routeType } from './types';

const userController = buildUserController();

const userRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'POST',
        path: '/users',
        kind: 'public',
        controller: userController.createUser,
        schema: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
    },
    {
        method: 'POST',
        path: '/login',
        kind: 'public',
        controller: userController.login,
    },
];

export { userRoutes };
