import { TextField } from '@mui/material';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { locale } from '../../locale';

function ImportFromUptimeRobot() {
    const [apiKey, setApiKey] = useState('');
    return (
        <div>
            <TextField
                label="API key"
                placeholder="API key"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
            />
            <Button>{locale.importFrom.uptimeRobot.fetchMonitorsButton}</Button>
        </div>
    );
}

export { ImportFromUptimeRobot };
