import * as assert from 'power-assert';
import { describe, it } from 'mocha';
import { Client, IClientParams } from '../Client';
import { createMemoryHistory } from 'history';
import * as I from '../interface';

describe('Client', () => {
  const enableMock = process.env.TEST_ENV === 'mock';
  const fetchMock = require('fetch-mock');
  const cp: IClientParams = {
    clientId: 'admin',
    apiEndpoint: 'http://localhost:8101',
    history: createMemoryHistory(),
  };
  const client = new Client(cp);

  beforeEach(() => {
  });

  context('createUser()', () => {
    if (enableMock) {
      fetchMock.post(
        '*',
        {
          status: 201,
          body: {
            name: 'user-name-0001'
          },
        }
      );
    }

    it('should userId type to be string', () => {
      let req = {
        name: 'user-name-0001'
      } as I.ICreateUserRequest;
      return client.createUser(req).then(res => {
        const user = res.user!;
        assert.equal(typeof(user.userId), 'string');
        assert.equal(typeof(user.name), 'string');
        assert.equal(typeof(user.metaData), 'object');
      });
    });

    // it('failure', () => {
    //   if (enableMock) {
    //     fetchMock.post(
    //       '*',
    //       {
    //         status: 400,
    //         body: {
    //           message: 'errrrrrrr'
    //         },
    //       }
    //     );
    //   }

    //   let req = {
    //   } as I.ICreateUserRequest;

    //   return client.createUser(req).then(res => {
    //     if (res.user) {
    //       assert(false);
    //     }
    //   });
    // });
  });

  afterEach(() => {
    enableMock ? fetchMock.restore() : null;
  });
});
