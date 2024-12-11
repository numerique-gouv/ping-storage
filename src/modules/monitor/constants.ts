const MONITOR_KINDS = ['app', 'cron'] as const;

type monitorKindType = (typeof MONITOR_KINDS)[number];

export { MONITOR_KINDS };
export type { monitorKindType };
