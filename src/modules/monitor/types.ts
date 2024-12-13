import { User } from '../user';

type appMonitorDtoType = {
    displayName: string;
    url: string;
    frequency: number;
};

type appMonitorType = {
    kind: 'app';
    id: string;
    name: string;
    displayName: string;
    url: string;
    frequency: number;
    gracePeriod: number;
    lastSuccessfulCall: string | null;
    lastCall: string | null;
    user: User;
};

type cronMonitorType = {
    kind: 'app';
    id: string;
    name: string;
    displayName: string;
    frequency: number;
    gracePeriod: number;
    lastPingedAt: string | null;
    user: User;
};

export type { appMonitorType, cronMonitorType, appMonitorDtoType };
