import { TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { monitorsApi } from '../../lib/api/monitorsApi';
import { useAlert } from '../../lib/alert';
import { useApiCall } from '../../lib/useApiCall';

function MonitorCreationForm() {
    const [displayName, setDisplayName] = useState('');
    const [url, setUrl] = useState('');
    const [frequency, setFrequency] = useState(10);
    const { displayAlert } = useAlert();

    const createMonitorApiCall = useApiCall({
        apiCall: monitorsApi.createMonitor,
        onSuccess: () => {
            displayAlert({ text: 'Vous avez bien créé un monitor', variant: 'success' });
            setDisplayName('');
            setUrl('');
            setFrequency(10);
        },
        queryKeyToInvalidate: ['me', 'monitors'],
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
            <Button isLoading={createMonitorApiCall.isLoading} type="submit">
                Créer un monitor
            </Button>
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
        createMonitorApiCall.perform({ displayName, frequency, url });
    }
}

export { MonitorCreationForm };
