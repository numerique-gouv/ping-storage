import { TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { useMutation } from '@tanstack/react-query';
import { monitorsApi } from '../../lib/api/monitorsApi';
import { useAlert } from '../../lib/alert';

function MonitorCreationForm() {
    const [displayName, setDisplayName] = useState('');
    const [url, setUrl] = useState('');
    const [frequency, setFrequency] = useState(10);
    const { displayAlert } = useAlert();

    const createMonitorMutation = useMutation({
        mutationFn: monitorsApi.createMonitor,
        onSuccess: () => {
            displayAlert({ text: 'Vous avez bien créé un monitor', variant: 'success' });
            setDisplayName('');
            setUrl('');
            setFrequency(10);
        },
        onError: (error) => {
            console.error(error);
            displayAlert({ text: 'Une erreur est survenue', variant: 'error' });
        },
    });
    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Nom" value={displayName} onChange={onChangeName} />
            <TextField label="URL" value={url} onChange={onChangeUrl} />
            <TextField
                label="Fréquence"
                type="number"
                value={frequency}
                onChange={onChangeFrequency}
            />
            <Button type="submit">Créer un monitor</Button>
        </form>
    );

    function onChangeName(event: ChangeEvent<HTMLInputElement>) {
        setDisplayName(event.target.value);
    }

    function onChangeUrl(event: ChangeEvent<HTMLInputElement>) {
        setUrl(event.target.value);
    }

    function onChangeFrequency(event: ChangeEvent<HTMLInputElement>) {
        if (!isNaN(Number(event.target.value))) {
            setFrequency(Number(event.target.value));
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        createMonitorMutation.mutate({ displayName, frequency, url });
    }
}

export { MonitorCreationForm };
