import { userInfoType } from '../../types';

const KEY = 'SENTINEL_USER_INFO';

function get() {
    const value = localStorage.getItem(KEY);
    if (!value) {
        return undefined;
    }
    return JSON.parse(value) as userInfoType;
}

function set(value: userInfoType) {
    localStorage.setItem(KEY, JSON.stringify(value));
}

function remove() {
    localStorage.removeItem(KEY);
}

const userInfoHandler = { get, set, remove };

export { userInfoHandler };
