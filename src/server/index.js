import { createServer } from 'spdy';

import env from 'constants/env';
import logger from 'utils/logger';

import app from './server';

/**
 * Make sure the process goes down to allow container resiliency
 */
const cleanup = () => {
    process.exit(1);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const options = { spdy: { ssl: false, plain: true } };
const server = createServer(options, app.callback());

server.listen(env.PORT, error => {
    if (error) {
        logger.error(error);
        process.exit(1);
    }

    logger.info(`Server listening on port: ${env.PORT}`);
});

export default server;
