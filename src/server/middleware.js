import compose from 'koa-compose';

import logger from './utils/logger';

const access = () => async (ctx, next) => {
    const { path } = ctx.request;
    const logRequest = !path.includes('/ping');

    if (logRequest) {
        logger.info(`received request ${ctx.method} "${ctx.url}"`);
    }

    await next();
};

const onError = () => async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        let message = !err.status ? 'Internal Server Error' : err.message;

        if (typeof message === 'string') {
            message = { message };
        }

        ctx.body = message;
        if (ctx.status >= 500) {
            ctx.app.emit('error', err, ctx);
        } else {
            ctx.app.emit('warn', err, ctx);
        }
    }
};

export const trace = () => compose([access(), onError()]);
export const centralizedErrorHandler = level => async err => {
    logger[level](err.message, err);
};
