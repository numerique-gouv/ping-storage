import Joi from 'joi';
import { anonymousControllerType } from './lib/buildController/types';

type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type routeType<paramsT, queryT, bodyT> = {
    method: methodType;
    path: string;
    controller: anonymousControllerType<paramsT, queryT, bodyT>;
    schema?: Joi.Schema;
};

export type { routeType };
