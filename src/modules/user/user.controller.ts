import { buildUserService } from './user.service';

export { buildUserController };

function buildUserController() {
    const userService = buildUserService();
    const userController = {
        createUser,
        login,
    };

    return userController;

    async function createUser(params: { body: { email: string; password: string } }) {
        return userService.createUser(params.body);
    }

    async function login(params: { body: { email: string; password: string } }) {
        return userService.login(params.body.email, params.body.password);
    }
}
