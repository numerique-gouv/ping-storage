import { Checkbox, FormControlLabel, TextField, Typography, styled } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { pathHandler } from '../lib/pathHandler';
import { LoadingButton } from '@mui/lab';
import { usersApi } from '../lib/api/usersApi';
import { Link } from 'react-router-dom';
import { localSessionHandler } from '../lib/localSessionHandler';
import { useApiCall } from '../lib/useApiCall';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCGVChecked, setIsCGVChecked] = useState(false);
    const navigate = useNavigate();

    const createUserApiCall = useApiCall({
        apiCall: usersApi.createUser,
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
                            <Typography variant="h2">Créer un compte</Typography>
                        </TitleContainer>

                        <FieldsContainer>
                            <FieldContainer>
                                <TextField
                                    required
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
                                    required
                                    fullWidth
                                    name="password"
                                    type="password"
                                    label="Mot de passe"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </FieldContainer>

                            <FieldContainer>
                                <FormControlLabel
                                    required
                                    control={
                                        <Checkbox checked={isCGVChecked} onChange={onChangeCGV} />
                                    }
                                    label={
                                        <Typography>
                                            J'ai lu et j'accepte les 
                                            <Link
                                                target="_blank"
                                                to={pathHandler.getRoutePath(
                                                    'TERMS_AND_CONDITIONS_OF_SALE',
                                                )}
                                            >
                                                Conditions Générales de Vente
                                            </Link>
                                        </Typography>
                                    }
                                />
                            </FieldContainer>
                        </FieldsContainer>

                        <LoadingButton
                            loading={createUserApiCall.isLoading}
                            type="submit"
                            variant="contained"
                            disabled={!password || !email || !isCGVChecked}
                        >
                            Créer un compte
                        </LoadingButton>
                    </CardContent>
                </Card>
            </ContentContainer>
        </>
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        createUserApiCall.perform({ email, password });
        event.preventDefault();
    }

    function onChangeCGV(_event: ChangeEvent<HTMLInputElement>, checked: boolean) {
        setIsCGVChecked(checked);
    }
}

const ContentContainer = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
});

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

export { SignUp };
