import { before, after } from 'mocha';
import nock from 'nock';
import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';

const server = require('../src/server/index').default;

chai.use(chaiHttp);
const requester = chai.request(server).keepOpen();

nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

after(() => {
  if (!nock.isDone()) {
    throw new Error('Not all nock interceptors were used!');
  }

  nock.cleanAll();
  nock.enableNetConnect();
  server.close();
});

module.exports = {
  chai,
  requester
};
