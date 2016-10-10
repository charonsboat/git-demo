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
                return bot.removeTweet(result.data.id_str);
            })
            .then(function () {
                done();
            });
    });

    it('[TwitterBot].getTweet() should read a Tweet from Twitter.', function (done)
    {
        var message = 'Running [TwitterBot] tests. [TwitterBot].getTweet() should read a Tweet from Twitter.';

        bot.tweet(message)
            .then(function (result) {
                return bot.getTweet(result.data.id_str);
            })
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.id_str).to.exist;
                expect(result.data.text).to.equal(message);

                // clean up
                return bot.removeTweet(result.data.id_str);
            })
            .then(function () {
                done();
            });
    });

    it('[TwitterBot].removeTweet() should remove a Tweet from Twitter.', function (done)
    {
        var message = 'Running [TwitterBot] tests. [TwitterBot].removeTweet() should remove a Tweet from Twitter.';

        bot.tweet(message)
            .then(function (result) {
                return bot.removeTweet(result.data.id_str);
            })
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.id_str).to.exist;
                expect(result.data.text).to.equal(message);

                done();
            });
    });

    it('[TwitterBot].retweet() should retweet a Tweet from Twitter.', function (done)
    {
        var message = 'Running [TwitterBot] tests. [TwitterBot].retweet() should retweet a Tweet from Twitter.';

        bot.tweet(message)
            .then(function (result) {
                return bot.retweet(result.data.id_str);
            })
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.id_str).to.exist;
                expect(result.data.user.screen_name).to.exist;
                expect(result.data.text).to.equal('RT @' + result.data.user.screen_name + ': ' + message);

                return bot.removeTweet(result.data.retweeted_status.id_str);
            })
            .then(function () {
                done();
            });
    });

    it('[TwitterBot].undoRetweet() should remove a Retweet from Twitter.', function (done)
    {
        var message = 'Running [TwitterBot] tests. [TwitterBot].undoRetweet() should remove a Retweet from Twitter.';

        bot.tweet(message)
            .then(function (result) {
                return bot.retweet(result.data.id_str);
            })
            .then(function (result) {
                return bot.undoRetweet(result.data.retweeted_status.id_str);
            })
            .then(function (result) {
                expect(result.data).to.exist;
                expect(result.data.id_str).to.exist;
                expect(result.data.text).to.equal(message);

                return bot.removeTweet(result.data.id_str);
            })
            .then(function () {
                done();
            });
    });
});
