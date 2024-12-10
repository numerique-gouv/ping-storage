import { dataSource } from '../../dataSource';
import { hasher } from '../../lib/hasher';
import { signer } from '../../lib/signer';
import { User } from './User.entity';

export { buildUserService };

function buildUserService() {
    const userRepository = dataSource.getRepository(User);

    const userService = {
        createUser,
        login,
    };

    return userService;

    async function createUser(params: { email: string; password: string }) {
        const newUser = new User();
        newUser.email = params.email;
        newUser.hashedPassword = hasher.hash(params.password);

        const result = await userRepository.insert(newUser);
        if (result.identifiers.length !== 1) {
            throw new Error(
                `Something wrong happened. ${result.identifiers.length} users were created.`,
            );
        }
        newUser.id = result.identifiers[0].id;

        const token = createJwt({
            userId: newUser.id,
            email: params.email,
        });
        const userInfo = {
            email: params.email,
        };
        return { token, userInfo };
    }

    function createJwt(params: { userId: User['id']; email: User['email'] }) {
        return signer.sign(params);
    }

    async function login(email: string, password: string) {
        const user = await userRepository.findOneOrFail({ where: { email } });

        const isPasswordCorrect = hasher.verify(password, user.hashedPassword);
        console.log(hasher.hash(password));
        if (isPasswordCorrect) {
            const token = createJwt({ userId: user.id, email: user.email });
            const userInfo = { email };

            return { token, userInfo };
        } else {
            throw new Error(`The password sent does not match the hashed stored password`);
        }
    }
}
