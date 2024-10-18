import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';

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
                    <li key={client.id}>{client.name}</li>
                ))}
            </ul>
        </div>
    );
}

export { Clients };
