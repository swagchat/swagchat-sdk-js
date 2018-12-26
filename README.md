[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)
[![npm version](https://badge.fury.io/js/swagchat-sdk.svg)](https://badge.fury.io/js/swagchat-sdk)

# swagchat SDK(TypeScript & JavaScript)

swagchat is an open source chat components for your webapps.

This is SDK for [Chat API](http://github.com/swagchat/chat-api)

**Currently developing for version 1**

## Architecture

![Architecture](https://client.fairway.ne.jp/swagchat/img/swagchat-start-guide-20170920.png "Architecture")
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fswagchat%2Fswagchat-sdk-js.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fswagchat%2Fswagchat-sdk-js?ref=badge_shield)

##### Related repositories

* [Chat API](https://github.com/fairway-corp/swagchat-chat-api)
* [RTM API (Real Time Messaging API)](https://github.com/fairway-corp/swagchat-rtm-api)
* [UIKit (A set of React components)](https://github.com/swagchat/react-swagchat)


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


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fswagchat%2Fswagchat-sdk-js.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fswagchat%2Fswagchat-sdk-js?ref=badge_large)