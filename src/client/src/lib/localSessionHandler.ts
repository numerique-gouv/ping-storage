import { userInfoType } from '../types';
import { localStorage } from './localStorage';

const localSessionHandler = {
    setToken,
    logout,
    getToken,
    getIsAuthenticated,
    setUserInfo,
};

function setToken(token: string) {
    localStorage.jwtTokenHandler.set(token);
}

function setUserInfo(userInfo: userInfoType) {
    localStorage.userInfoHandler.set(userInfo);
}

function getToken() {
    return localStorage.jwtTokenHandler.get();
}

function getIsAuthenticated() {
    return !!localStorage.jwtTokenHandler.get();
}

function logout() {
    localStorage.userInfoHandler.remove();
    localStorage.jwtTokenHandler.remove();
}

export { localSessionHandler };
