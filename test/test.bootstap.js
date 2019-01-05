require('@babel/register')({
	extensions : ['.js', '.jsx', '.ts', '.tsx']
});

import Mocha, { before, after } from 'mocha';
Mocha.reporters.base.useColors = true;
import nock from 'nock';
import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
const server = require('../src/server/index.ts').default;

chai.use(chaiHttp);
const requester = chai.request(server).keepOpen();

// expose variables
before(async () => {
	nock.disableNetConnect();
	nock.enableNetConnect('127.0.0.1');
	global.nock = nock;
	global.chai = chai;
	global.requester = requester;
});

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
	requester,
	nock
};
