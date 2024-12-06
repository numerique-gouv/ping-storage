interface genericEvent {
    id: number;

    title: string;

    kind: eventKindType;

    createdAt: string;
}

const EVENT_KINDS = ['up', 'down'] as const;

type eventKindType = (typeof EVENT_KINDS)[number];

export { EVENT_KINDS };
export type { eventKindType, genericEvent };
