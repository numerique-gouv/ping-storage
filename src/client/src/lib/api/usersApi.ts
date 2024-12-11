import { userInfoType } from '../../types';
import { performApiCall } from './utils';

const usersApi = {
    createUser,
    login,
};

async function createUser(params: { email: string; password: string }) {
    const URI = `users`;
    return performApiCall<{ token: string; userInfo: userInfoType }>(URI, 'POST', {
        email: params.email,
        password: params.password,
    });
}

async function login(params: { email: string; password: string }) {
    const URI = `login`;
    return performApiCall<{ token: string; userInfo: userInfoType }>(URI, 'POST', {
        email: params.email,
        password: params.password,
    });
}

export { usersApi };
