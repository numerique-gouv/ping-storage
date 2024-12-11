import { userInfoType } from '../../types';
import { performApiCall } from './utils';

const usersApi = {
    createUser,
    login,
};

async function createUser(params: {
    email: string;
    password: string;
}): Promise<{ token: string; userInfo: userInfoType }> {
    const URI = `users`;
    return performApiCall(URI, 'POST', {
        email: params.email,
        password: params.password,
    });
}

async function login(params: {
    email: string;
    password: string;
}): Promise<{ token: string; userInfo: userInfoType }> {
    const URI = `login`;
    return performApiCall(URI, 'POST', { email: params.email, password: params.password });
}

export { usersApi };
