import { buildAlertSubscriptionService } from './alertSubscription.service';

export { buildAlertSubscriptionController };

function buildAlertSubscriptionController() {
    const alertSubscriptionService = buildAlertSubscriptionService();
    const alertSubscriptionController = {
        createAlertSubscription,
    };

    return alertSubscriptionController;

    async function createAlertSubscription(params: {
        body: { email: string };
        urlParams: { monitorId: string };
    }) {
        return alertSubscriptionService.createAlertSubscription({
            email: params.body.email,
            monitorId: params.urlParams.monitorId,
        });
    }
}
