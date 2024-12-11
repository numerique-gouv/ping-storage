import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAlert } from './alert';

function useApiCall<apiCallParamsT, apiCallDataT>(props: {
    apiCall: (params: apiCallParamsT) => Promise<apiCallDataT>;
    queryKeyToInvalidate?: string[];
    onSuccess: (data: apiCallDataT) => void;
    errorText: string;
}) {
    const client = useQueryClient();
    const { displayAlert } = useAlert();
    const mutation = useMutation({
        mutationFn: props.apiCall,
        onSuccess: (data) => {
            if (props.queryKeyToInvalidate) {
                client.invalidateQueries({ queryKey: props.queryKeyToInvalidate });
            }
            props.onSuccess(data);
        },
        onError: (error) => {
            console.error(error);
            displayAlert({
                variant: 'error',
                text: props.errorText,
            });
        },
    });
    const perform = mutation.mutate;
    const isLoading = mutation.isPending;

    return { perform, isLoading };
}

export { useApiCall };
