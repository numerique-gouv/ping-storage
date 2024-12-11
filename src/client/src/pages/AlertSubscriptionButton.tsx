import { FormEvent, useState } from 'react';
import { alertSubscriptionsApi } from '../lib/api/alertSubscriptionsApi';
import { useApiCall } from '../lib/useApiCall';
import { locale } from '../locale';
import { Button } from '../components/Button';
import { Menu, styled, TextField, Typography } from '@mui/material';

const MENU_WIDTH = 275;

function AlertSubscriptionButton(props: { monitorId: string }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [email, setEmail] = useState('');
    const createAlertSubscriptionApiCall = useApiCall({
        apiCall: alertSubscriptionsApi.createAlertSubscription,
        successText: 'Vous avez bien souscrit à cette alerte.',
        onSuccess: () => {
            setEmail('');
            setAnchorEl(null);
        },
    });
    return (
        <>
            <Button onClick={openMenu}>
                {locale.monitorSummary.alertSubscriptionButton.label}
            </Button>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
                <MenuContent onSubmit={subscribe}>
                    <Title variant="h4">
                        {locale.monitorSummary.alertSubscriptionButton.menu.title}
                    </Title>
                    <Subtitle variant="h6">
                        {locale.monitorSummary.alertSubscriptionButton.menu.subtitle}
                    </Subtitle>
                    <TextFieldContainer>
                        <TextField
                            placeholder="Adresse e-mail"
                            label="Adresse e-mail"
                            autoFocus
                            fullWidth
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </TextFieldContainer>
                    <Button
                        type="submit"
                        isLoading={createAlertSubscriptionApiCall.isLoading}
                        disabled={!email}
                        fullWidth
                        variant="contained"
                    >
                        {locale.monitorSummary.alertSubscriptionButton.menu.button}
                    </Button>
                </MenuContent>
            </Menu>
        </>
    );

    function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    }

    function subscribe(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        createAlertSubscriptionApiCall.perform({ email, monitorId: props.monitorId });
    }

    function closeMenu() {
        setAnchorEl(null);
    }
}

const Title = styled(Typography)(({ theme }) => ({ marginBottom: theme.spacing(1) }));
const Subtitle = styled(Typography)(({ theme }) => ({ marginBottom: theme.spacing(2) }));
const TextFieldContainer = styled('div')(({ theme }) => ({ marginBottom: theme.spacing(1) }));
const MenuContent = styled('form')(({ theme }) => ({
    padding: theme.spacing(3),
    width: MENU_WIDTH,
}));

export { AlertSubscriptionButton };
