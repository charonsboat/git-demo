# @drm2/twitterbot

A JavaScript/Node framework for building better Twitter bots. Built on Twit with full Promise support.

## Installation

@drm2/twitterbot is available via NPM.

```bash
npm install @drm2/twitterbot --save
```

## Features

- REST API Access
- Streaming API Access
- Scheduling

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

Posts a new Tweet.

#### message: string

The status you want to post on Twitter.

#### Example

```javascript
bot.tweet('Hello, World!')
    .catch(function (error) {
        console.log('Error:', error);
    })
    .then(function (result) {
        console.log('Data:', result.data);
        console.log('Response:', result.resp);
    });
```

### `[TwitterBot].getTweet(id)`

Retrieves a Tweet with the given id.

#### id: string

The id of the Tweet you want to retrieve.

#### Example

```javascript
bot.getTweet('IdOfTheTweetYouWantToRetrieve')
    .catch(function (error) {
        console.log('Error:', error);
    })
    .then(function (result) {
        console.log('Data:', result.data);
        console.log('Response:', result.resp);
    });
```

### `[TwitterBot].removeTweet(id)`

Removes a Tweet with the given id.

#### id: string

The id of the Tweet you want to remove.

#### Example

```javascript
bot.removeTweet('IdOfTheTweetYouWantToRemove')
    .catch(function (error) {
        console.log('Error:', error);
    })
    .then(function (result) {
        console.log('Data:', result.data);
        console.log('Response:', result.resp);
    });
```
