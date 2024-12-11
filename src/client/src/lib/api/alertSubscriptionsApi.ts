import { performApiCall } from './utils';

const alertSubscriptionsApi = {
    createAlertSubscription,
};

async function createAlertSubscription(params: { email: string; monitorId: string }) {
    const URI = `monitors/${params.monitorId}/alert-subscriptions`;
    return performApiCall<{ ok: boolean }>(URI, 'POST', {
        email: params.email,
    });
}

export { alertSubscriptionsApi };
