import { monitorsApi } from '../../lib/api/monitorsApi';
import { MonitorCreationForm } from './MonitorCreationForm';
import { Query } from '../../components/Query';
import { Link } from '../../components/Link';
import { pathHandler } from '../../lib/pathHandler';

function Monitors() {
    return (
        <Query apiCall={monitorsApi.getMyMonitors} queryKey={['me', 'monitors']}>
            {(data) => (
                <div>
                    <MonitorCreationForm />
                    <ul>
                        {data.map((monitor) => (
                            <li key={monitor.id}>
                                <Link
                                    to={pathHandler.getRoutePath('MONITOR_SUMMARY', {
                                        monitorId: monitor.id,
                                    })}
                                >
                                    {monitor.displayName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Query>
    );
}

export { Monitors };
