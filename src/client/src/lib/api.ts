import { config } from '../config';
import { localStorage } from './localStorage';

const api = { getClients };

const BASE_URL = `${config.API_URL}/api`;

async function performApiCall(
    url: string,
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    body?: Object,
) {
    let response: Response;
    const token = localStorage.jwtTokenHandler.get();

    if (method === 'GET') {
        response = await fetch(url, { method, headers: { Authorization: `Bearer ${token}` } });
    } else {
        const headers: Record<string, string> = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        response = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body),
        });
    }
    if (!response.ok) {
        if (response.status === 401) {
            localStorage.jwtTokenHandler.remove();
        }
        let message = response.statusText;
        try {
            message = await response.text();
        } catch (error) {
            console.error(error);
        } finally {
            throw new Error(message);
        }
    }
    return response.json();
}

async function getClients() {
    const URL = `${BASE_URL}/clients`;
    return performApiCall(URL, 'GET');
}

export { api };
