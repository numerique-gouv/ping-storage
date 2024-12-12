import * as Brevo from '@getbrevo/brevo';
import { config } from '../../config';
import { logger } from '../logger';

function buildMailer() {
    const ContactApiInstance = new Brevo.ContactsApi();
    ContactApiInstance.setApiKey(Brevo.ContactsApiApiKeys.apiKey, config.BREVO_API_KEY);

    const mailer = {
        registerContact,
    };

    async function registerContact(email: string) {
        const createContact = new Brevo.CreateContact();
        createContact.email = email;
        try {
            await ContactApiInstance.createContact(createContact);
            return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    return mailer;
}

const mailer = buildMailer();

export { mailer };
