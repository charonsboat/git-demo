var expect = require('chai').expect;
var TwitterBot = require('../src/TwitterBot');
var dotenv = require('dotenv');

// load our environment variables
dotenv.config({ path: __dirname + '/../.env' });

// initialize the TwitterBot
var bot = new TwitterBot({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

describe('[TwitterBot].[Actions]', function ()
{
    it('[TwitterBot].tweet() should post a Tweet on Twitter.', function (done)
    {
        var message = 'Running [TwitterBot] tests. [TwitterBot].tweet() should post a Tweet on Twitter.';

        bot.tweet(message)
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.id_str).to.exist;
                expect(result.data.text).to.equal(message);

                // clean up
                return bot.deleteTweet(result.data.id_str);
            })
            .then(function () {
                done();
            });
    });

    it('[TwitterBot].deleteTweet() should remove a Tweet from Twitter.', function (done)
    {
        var message = 'Running [TwitterBot] tests. [TwitterBot].deleteTweet() should remove a Tweet from Twitter.';

        bot.tweet(message)
            .then(function (result) {
                return bot.deleteTweet(result.data.id_str);
            })
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.id_str).to.exist;
                expect(result.data.text).to.equal(message);

                done();
            });
    });

    it('[TwitterBot].readTweet() should read a Tweet from Twitter.', function (done)
    {
        var message = 'Running [TwitterBot] tests. [TwitterBot].readTweet() should read a Tweet from Twitter.';

        bot.tweet(message)
            .then(function (result) {
                return bot.readTweet(result.data.id_str);
            })
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.id_str).to.exist;
                expect(result.data.text).to.equal(message);

                // clean up
                return bot.deleteTweet(result.data.id_str);
            })
            .then(function () {
                done();
            });
    });
});
