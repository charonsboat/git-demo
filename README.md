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

#### Example

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

#### References

Twit

- [Initialization](https://github.com/ttezel/twit/blob/master/README.md#var-t--new-twitconfig)

Twitter

- [Authentication and Authorization](https://dev.twitter.com/oauth/overview/application-owner-access-tokens)

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

#### References

Twit

- [Twit.post()](https://github.com/ttezel/twit/blob/master/README.md#tpostpath-params-callback)

Twitter

- [POST statuses/update](https://dev.twitter.com/rest/reference/post/statuses/update)

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

#### References

Twit

- [Twit.get()](https://github.com/ttezel/twit/blob/master/README.md#tgetpath-params-callback)

Twitter

- [GET statuses/show/:id](https://dev.twitter.com/rest/reference/get/statuses/show/%3Aid)

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

#### References

Twit

- [Twit.post()](https://github.com/ttezel/twit/blob/master/README.md#tpostpath-params-callback)

Twitter

- [POST statuses/destroy/:id](https://dev.twitter.com/rest/reference/post/statuses/destroy/%3Aid)

### `[TwitterBot].retweet(id)`

Retweets a Tweet with the given id.

#### id: string

The id of the Tweet you want to retweet.

#### Example

```javascript
bot.retweet('IdOfTheTweetYouWantToRetweet')
    .catch(function (error) {
        console.log('Error:', error);
    })
    .then(function (result) {
        console.log('Data:', result.data);
        console.log('Response:', result.resp);
    });
```

#### References

Twit

- [Twit.post()](https://github.com/ttezel/twit/blob/master/README.md#tpostpath-params-callback)

Twitter

- [POST statuses/retweet/:id](https://dev.twitter.com/rest/reference/post/statuses/retweet/%3Aid)

### `[TwitterBot].undoRetweet(id)`

Removes the Retweet based on the given Tweet id.

#### id: string

The id of the original Tweet (can also be the Retweet id).

#### Example

```javascript
bot.undoRetweet('IdOfTheOriginalTweetOrTheRetweet')
    .catch(function (error) {
        console.log('Error:', error);
    })
    .then(function (result) {
        console.log('Data:', result.data);
        console.log('Response:', result.resp);
    });
```

#### References

Twit

- [Twit.post()](https://github.com/ttezel/twit/blob/master/README.md#tpostpath-params-callback)

Twitter

- [POST statuses/unretweet/:id](https://dev.twitter.com/rest/reference/post/statuses/unretweet/%3Aid)

### `[TwitterBot].schedule(action, schedule)`

Runs the given action(s) based on the given schedule.

#### action: function

The action to run on the given schedule. Usually a function containing the logic to run TwitterBot actions.

#### schedule: Date|string

The Date object or CRON string used to define the schedule.

#### Example

```javascript
// set our schedule for 30 seconds from now
var schedule = new Date(Date.now() + (30 * 1000));

var handler = bot.schedule(function () {
    bot.tweet('Hello, World!');
}, schedule);

// if you want to cancel the action at any point before it runs, just use the handler
handler.cancel();
```

#### References

Node Schedule

- [Jobs and Scheduling](https://github.com/node-schedule/node-schedule#jobs-and-scheduling)

### `[TwitterBot].repeat(action, delay)`

Repeats the given action(s) based on the given delay.

#### action: function

The action to run on every iteration. Usually a function containing the logic to run TwitterBot actions.

#### delay: integer

The delay time (in milliseconds) between each iteration.

#### Example

```javascript
// Tweets 'Hello, World!' once every hour
var handler = bot.repeat(function () {
    bot.tweet('Hello, World!');
}, (60 * 60 * 1000));

// if you want to cancel the repeater at any point, just use the handler
handler.cancel();
```
