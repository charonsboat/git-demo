var TwitterBot = require('./src/TwitterBot');
var dotenv = require('dotenv');

// load our environment variables
dotenv.config();

// initialize the TwitterBot
var bot = new TwitterBot({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/*
 * TwitterBot.tweet
 *
 * Tweets the passed message.
 *
 * @param content string
 * @return Promise
 */
// bot.tweet('[bot test] immediate tweet.')
//     .then(function (result) {
//         console.log('Data: ', result.data);
//     })
//     .catch(function (error) {
//         console.log('Error: ', error);
//     });

/*
 * TwitterBot.scheduleTweet
 *
 * Tweets the passed message at the specified date/time.
 *
 * @param schedule string|Date
 * @param content string
 * @return CancelablePromise
 */
var handler = bot.scheduleTweet(new Date((new Date()).getTime() + (10 * 1000)), '[bot test] delayed tweet (10 seconds).')
    .then(function (result) {
        console.log(result.data);
    })
    .catch(function () {

    });

// setTimeout(function() {
//     handler.cancel();
// }, 8000);
