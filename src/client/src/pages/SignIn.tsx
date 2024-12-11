import { TextField, Typography, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
// import { Link } from '../components/Link';
import { pathHandler } from '../lib/pathHandler';
import { LoadingButton } from '@mui/lab';
import { usersApi } from '../lib/api/usersApi';
import { localSessionHandler } from '../lib/localSessionHandler';
import { useApiCall } from '../lib/useApiCall';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginApiCall = useApiCall({
        apiCall: usersApi.login,
        onSuccess: (data) => {
            const { token, userInfo } = data;
            localSessionHandler.setToken(token);
            localSessionHandler.setUserInfo(userInfo);

            navigate(pathHandler.getRoutePath('HOME'));
        },
    });

    return (
        <>
            <ContentContainer>
                <Card size="medium">
                    <CardContent onSubmit={handleSubmit}>
                        <TitleContainer>
                            <Typography variant="h2">Se connecter</Typography>
                        </TitleContainer>

                        <FieldsContainer>
                            <FieldContainer>
                                <TextField
                                    autoFocus
                                    fullWidth
                                    name="email"
                                    type="email"
                                    label="Adresse e-mail"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </FieldContainer>
                            <FieldContainer>
                                <TextField
                                    fullWidth
                                    name="password"
                                    type="password"
                                    label="Mot de passe"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </FieldContainer>
                            {/* <DisplayPasswordLinkContainer>
                                <Link to="/request-reset-password">
                                    <Typography>Mot de passe oublié ?</Typography>
                                </Link>
                            </DisplayPasswordLinkContainer> */}
                        </FieldsContainer>

                        <LoadingButton
                            loading={loginApiCall.isLoading}
                            type="submit"
                            variant="contained"
                            disabled={!password || !email}
                        >
                            Se connecter
                        </LoadingButton>
                    </CardContent>
                </Card>
            </ContentContainer>
        </>
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        loginApiCall.perform({ email, password });
        event.preventDefault();
    }
}

const ContentContainer = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
});

// const DisplayPasswordLinkContainer = styled('div')({
//     display: 'flex',
//     textDecorationLine: 'underline',
//     alignItems: 'center',
//     justifyContent: 'center',
// });

const CardContent = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
}));

const FieldsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
}));
const FieldContainer = styled('div')(({ theme }) => ({ marginBottom: theme.spacing(2) }));
const TitleContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(6),
    textAlign: 'center',
}));

export { SignIn };
