import { systemPulsesApi } from '../lib/api/systemPulsesApi';
import { Link } from 'react-router-dom';
import { pathHandler } from '../lib/pathHandler';
import { Query } from '../components/Query';

function SystemPulses() {
    return (
        <Query apiCall={systemPulsesApi.getMySystemPulses} queryKey={['me', 'system-pulses']}>
            {(data) => (
                <div>
                    <ul>
                        {data.map((systemPulse) => (
                            <li key={systemPulse.id}>
                                <Link
                                    to={pathHandler.getRoutePath('SYSTEM_PULSE_SUMMARY', {
                                        systemPulseId: systemPulse.id,
                                    })}
                                >
                                    {systemPulse.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Query>
    );
}

export { SystemPulses };
