import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from '../config';
import { dataSource } from '../dataSource';
import { router } from '../router';
import { logger } from '../lib/logger';

export { runApp };

async function runApp() {
    await dataSource.initialize();
    logger.info(`Data source has been initialized`);

    const app = Express();

    app.use('/api', bodyParser.json(), cors({ origin: config.HOST_URL }), router);

    app.listen(config.PORT, async () => {
        logger.info(`Server is running on port ${config.PORT}`);
    });
}
