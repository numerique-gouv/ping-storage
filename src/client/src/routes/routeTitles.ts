import { ROUTE_KEYS } from './routeKeys';

const ROUTE_TITLES: Record<(typeof ROUTE_KEYS)[number], string> = {
    HOME: 'Accueil',
    SYSTEM_PULSES: 'Liste des pouls',
    SYSTEM_PULSE_SUMMARY: 'Résumé',
    MONITORS: 'Monitors',
    SIGN_IN: 'Connexion',
    SIGN_UP: 'Création de compte',
    TERMS_AND_CONDITIONS_OF_SALE: 'CGV',
};

export { ROUTE_TITLES };
