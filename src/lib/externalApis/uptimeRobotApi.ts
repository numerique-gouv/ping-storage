type uptimeRobotMonitorApiType = {
    id: number;
    friendly_name: string;
    url: string;
    interval: number;
};

function buildUptimeRobotApi(uptimeRobotApiKey: string) {
    const BASE_URL = `https://api.uptimerobot.com/v2`;

    return { fetchMonitors };

    async function fetchMonitors() {
        const URL = `${BASE_URL}/getMonitors?format=json&api_key=${uptimeRobotApiKey}`;
        try {
            const response = await fetch(URL, { method: 'POST' });
            const data = (await response.json()) as { monitors: uptimeRobotMonitorApiType[] };

            return data.monitors.map((monitor) => ({
                url: monitor.url,
                frequency: monitor.interval / 60,
                displayName: monitor.friendly_name,
            }));
        } catch (error) {
            throw new Error(`Le serveur uptimeRobot a renvoyé l'erreur suivante : ${error}`);
        }
    }
}

export { buildUptimeRobotApi };
