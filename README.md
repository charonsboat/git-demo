# @drm2/twitterbot

A JavaScript/Node framework for building better Twitter bots. Built on Twit with full Promise support.

## Features

## API

### Initialization

TwitterBot is built on top of Twit, so it is initialized the same way.

```javascript
var TwitterBot = require('@drm2/twitterbot');

var options = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

var bot = new TwitterBot(options);
```

### `[TwitterBot].tweet(message)`

Posts a new Tweet on Twitter.

#### message: string

The status you want to post on Twitter.

#### Example
