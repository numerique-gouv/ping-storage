import Joi from 'joi';
import { anonymousControllerType, authenticatedControllerType } from './lib/buildController/types';
import { User } from '../modules/user';

type methodType = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type routeType<paramsT, queryT, bodyT> =
    | {
          kind: 'authenticated';
          method: methodType;
          path: string;
          controller: authenticatedControllerType<paramsT, queryT, bodyT>;
          schema?: Joi.Schema;
          checkAuthorization?: (params: paramsT, user: User) => void | Promise<void>;
      }
    | {
          kind: 'public';
          method: methodType;
          path: string;
          controller: anonymousControllerType<paramsT, queryT, bodyT>;
          schema?: Joi.Schema;
      };

export type { routeType };
