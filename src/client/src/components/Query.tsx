import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

function Query<dataT>(props: {
    apiCall: () => Promise<dataT>;
    queryKey: string[];
    children: (data: dataT) => ReactNode;
}): JSX.Element {
    const query = useQuery({ queryFn: props.apiCall, queryKey: props.queryKey });
    if (query.error) {
        return <div>ERROR</div>;
    }

    if (!query.data) {
        if (query.isLoading) {
            return <div>Loading</div>;
        }
        if (query.error) {
            return <div>ERROR</div>;
        }
        return <div>Pas de données</div>;
    }
    return <>{props.children(query.data)}</>;
}

export { Query };
