import { monitorsApi } from '../../lib/api/monitorsApi';
import { MonitorCreationForm } from './MonitorCreationForm';
import { Query } from '../../components/Query';

function Monitors() {
    return (
        <Query apiCall={monitorsApi.getMyMonitors} queryKey={['monitors']}>
            {(data) => (
                <div>
                    <MonitorCreationForm />
                    <ul>
                        {data.map((monitor) => (
                            <li key={monitor.id}>{monitor.displayName}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Query>
    );
}

export { Monitors };
