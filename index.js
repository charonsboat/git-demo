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


// test for [TwitterBot].tweet
// bot.tweet('[bot test] immediate tweet.')
//     .then(function (result) {
//         console.log('Data: ', result.data);
//     })
//     .catch(function (error) {
//         console.log('Error: ', error);
//     });


// test for [TwitterBot].scheduleTweet
var handler = bot.scheduleTweet('[bot test] delayed tweet (5 seconds).', new Date((new Date()).getTime() + (5 * 1000)))
    .then(function (result) {
        console.log('Data: ', result.data);
    })
    .catch(function (error) {
        console.log('Error: ', error);
    });
//
// setTimeout(function() {
//     handler.cancel();
// }, 8000);


// test for [TwitterBot].deleteTweet
// we have to create a tweet to get the id and delete it
// bot.tweet('[bot test] this tweet will automatically be deleted immediately.')
//     .then(function (result) {
//         console.log('Created Tweet: ', result.data);
//         return bot.deleteTweet(result.data.id_str);
//     })
//     .then(function (result) {
//         console.log('Deleted Tweet: ', result.data);
//     })
//     .catch(function (error) {
//         console.log('Error: ', error);
//     });


// test for [TwitterBot].schedule
// returning the resolver to chain onto the scheduler (useful for action chaining)
// var handler = bot.schedule(function () {
//     return bot.tweet('[bot test] this tweet is delayed.');
// }, new Date((new Date()).getTime() + (5 * 1000)))
//     .then(function (result) {
//         console.log(result.data);
//     });
//
// handler.cancel();

// chaining onto the resolver inside the scheduler (useful for triggering multiple actions at once)
// var handler = bot.schedule(function () {
//     bot.tweet('[bot test] this tweet is delayed.')
//         .then(function (result) {
//             console.log('Data:', result.data);
//         })
//         .catch(function (error) {
//             console.log('Error:', error);
//         });
//
//     // possibly perform multiple actions in one schedule instance
// }, new Date((new Date()).getTime() + (5 * 1000)))
//     .then(function () {
//         // nothing passed but the Promise still resolves when the action finishes
//     });
//
// handler.cancel();
