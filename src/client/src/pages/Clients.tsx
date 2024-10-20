import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { Link } from 'react-router-dom';
import { pathHandler } from '../lib/pathHandler';

type clientType = {
    id: string;
    name: string;
};

function Clients() {
    const query = useQuery<clientType[]>({ queryFn: api.getClients, queryKey: ['clients'] });

    if (!query.data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <ul>
                {query.data.map((client) => (
                    <li key={client.id}>
                        <Link
                            to={pathHandler.getRoutePath('CLIENT_SUMMARY', { clientId: client.id })}
                        >
                            {client.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { Clients };
