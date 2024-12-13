import { TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { Button } from '../../components/Button';
import { locale } from '../../locale';
import { useApiCall } from '../../lib/useApiCall';
import { appMonitorDtoType, monitorsApi } from '../../lib/api/monitorsApi';
import { AppMonitorList } from './AppMonitorList';

function ImportFromUptimeRobot() {
    const [apiKey, setApiKey] = useState('');
    const [appMonitorsDtos, setAppMonitorDtos] = useState<appMonitorDtoType[] | undefined>();
    const fetchMonitorsFromUptimeRobotApiCall = useApiCall({
        apiCall: monitorsApi.fetchMonitorsFromUptimeRobot,
        onSuccess: (data) => {
            setAppMonitorDtos(data);
        },
    });
    return (
        <div>
            <form onSubmit={fetchMonitors}>
                <TextField
                    label="API key"
                    placeholder="API key"
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                />
                <Button
                    type="submit"
                    disabled={!apiKey}
                    isLoading={fetchMonitorsFromUptimeRobotApiCall.isLoading}
                >
                    {locale.importFrom.uptimeRobot.fetchMonitorsButton}
                </Button>
            </form>
            {appMonitorsDtos !== undefined && <AppMonitorList appMonitorsDtos={appMonitorsDtos} />}
        </div>
    );

    function fetchMonitors(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        fetchMonitorsFromUptimeRobotApiCall.perform(apiKey);
    }
}

export { ImportFromUptimeRobot };
