import { userInfoType } from '../../types';
import { BASE_URL } from './constants';
import { performApiCall } from './utils';

const usersApi = {
    createUser,
    login,
};

async function createUser(params: {
    email: string;
    password: string;
}): Promise<{ token: string; userInfo: userInfoType }> {
    const URL = `${BASE_URL}/users`;
    return performApiCall(URL, 'POST', {
        email: params.email,
        password: params.password,
    });
}

async function login(params: {
    email: string;
    password: string;
}): Promise<{ token: string; userInfo: userInfoType }> {
    const URL = `${BASE_URL}/login`;
    return performApiCall(URL, 'POST', { email: params.email, password: params.password });
}

export { usersApi };
