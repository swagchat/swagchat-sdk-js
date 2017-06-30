[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![npm version](https://badge.fury.io/js/swagchat-sdk.svg)](https://badge.fury.io/js/swagchat-sdk)

# SwagChat SDK(TypeScript & JavaScript)

SwagChat is an open source chat components for your webapps.

This is SDK for TypeScript & JavaScript of [SwagChat API](http://github.com/fairway-corp/swagchat-api)


## Components

* [RESTful API Server (Go)](http://github.com/fairway-corp/swagchat-api)
* [Realtime Messaging (Go)](http://github.com/fairway-corp/swagchat-realtime)
* **Client SDK (TypeScript & JavaScript) ---> This repository**
* [UIKit (Typescript - React)](http://github.com/fairway-corp/react-swagchat)

## Architecture

![Architecture](https://client.fairway.ne.jp/swagchat/img/architecture-201703011307.png "Architecture")

## Installation

### CDN

```
<script src="https://unpkg.com/swagchat-sdk/dist/swagchat-sdk.min.js"></script>
```

### npm

```
npm install --save swagchat-sdk
```

Please use TypeScript for development, but you do not need to install `@types/swagchat-sdk`.


Type definitions are included in this repository.

## Usage

### Browser

```
<script src="https://unpkg.com/swagchat-sdk/dist/swagchat-sdk.min.js"></script>
<script >
// Initialize client.
var sc = new SwagChat.Client({
  apiKey: "API_KEY",
  apiSecret: "API_SECRET",
  apiEndpoint: "http://localhost:9000/v0",
  realtime: {
    endpoint: "ws://localhost:9100/v0"
  }
});

// Create user.
sc.createUser({
  name: "USER_NAME",
}).then(function(res) {
  if (res.error) {
    console.log(res.error);
  } else {
    console.log(res.user);
  }
})
</script>
```

### Node

```
import { Client } from "swagchat-sdk";

// Initialize client.
const sc = new Client({
  apiKey: "API_KEY",
  apiSecret: "API_SECRET",
  apiEndpoint: "http://localhost:9000/v0",
  realtime: {
    endpoint: "ws://localhost:9100/v0"
  }
});

// Create user.
sc.createUser({
  name: "USER_NAME",
}).then(function(res) {
  if (res.error) {
    console.log(res.error);
  } else {
    console.log(res.user);
  }
})

```

## Document

Open `doc/index.html` in browser.

*Generated using [TypeDoc](http://typedoc.org)*

## License

MIT License.
