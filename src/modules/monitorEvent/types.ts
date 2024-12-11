const EVENT_KINDS = ['up', 'down'] as const;

type eventKindType = (typeof EVENT_KINDS)[number];

export { EVENT_KINDS };
export type { eventKindType };
