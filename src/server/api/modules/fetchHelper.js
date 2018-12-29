/* eslint-disable import/prefer-default-export */

export const fetchResolve = (ctx, result) => {
  const { status, body } = result;
  ctx.status = status;
  ctx.body = body;
};

export const fetchReject = (ctx, err) => {
  const { response } = err;
  if (response) {
    const { status, body } = response;
    ctx.status = status;
    ctx.body = body;
  } else {
    ctx.throw(err.message);
  }
};

export const fetchOptions = (params = {}) => {
  const { method = 'GET', compress = true, body, headers: reqHeaders } = params;

  const options = {
    method,
    body,
    compress
  };

  if (typeof body === 'object') {
    const headers = reqHeaders || {};
    headers['Content-Type'] = 'application/json';
    options.headers = headers;
    options.body = JSON.stringify(body);
  }

  return options;
};
