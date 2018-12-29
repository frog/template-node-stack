import logger from './logger';

export const parseJSON = str => {
  try {
    const res = JSON.parse(str);
    return res;
  } catch (err) {
    logger.error(err);
    return undefined;
  }
};

export const validateRequired = (params, required, ctx) => {
  let message;

  required.some(key => {
    const hasErr =
      params[key] === null || params[key] === undefined || params[key] === '';

    if (hasErr) {
      message = `parameter ${key} is mandatory`;
    }

    return hasErr;
  });

  if (message && ctx) {
    ctx.throw(400, message);
  }

  if (message) {
    throw new Error(JSON.stringify({ message }));
  }
};
