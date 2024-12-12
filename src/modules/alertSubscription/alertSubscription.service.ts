import { dataSource } from '../../dataSource';
import { mailer } from '../../lib/mailer';
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
        const isAlreadySubscribed = await alertSubscriptionRepository.existsBy({
            email: params.email,
            monitor: { id: params.monitorId },
        });
        if (isAlreadySubscribed) {
            throw new Error(`Vous avez déjà souscrit à cette alerte.`);
        }
        await mailer.registerContact(params.email);

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
