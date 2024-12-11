import { dataSource } from '../../dataSource';
import { Monitor } from '../monitor';
import { AlertSubscription } from './AlertSubscription.entity';

export { buildAlertSubscriptionService };

function buildAlertSubscriptionService() {
    const alertSubscriptionRepository = dataSource.getRepository(AlertSubscription);

    const alertSubscriptionService = {
        createAlertSubscription,
    };

    return alertSubscriptionService;

    async function createAlertSubscription(params: { email: string; monitorId: Monitor['id'] }) {
        const result = await alertSubscriptionRepository.insert({
            email: params.email,
            monitor: { id: params.monitorId },
        });
        if (result.identifiers.length !== 1) {
            throw new Error(
                `Something wrong happened. ${result.identifiers.length} alertSubscriptions were created.`,
            );
        }

        return { ok: true };
    }
}
