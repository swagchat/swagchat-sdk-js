import { Client } from '../src/Client';

const client = new Client({
  apiKey: '',
  apiSecret: '',
  apiEndpoint: 'http://localhost:8000/v0',
  wsEndpoint: 'ws://localhost:9100/v0',
  authConfig: {
    "realm": "swagbot",
    "auth-server-url": "http://localhost:8180/auth",
    "ssl-required": "external",
    "resource": "swagbot-react",
    "public-client": true,
    "confidential-port": 0
  },
})

client.auth();