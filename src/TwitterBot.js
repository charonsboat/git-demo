var Twit = require('twit');
var Schedule = require('node-schedule');
var Promise = require('bluebird');
var Interval = require('./Interval');

Promise.config({
    cancellation: true
});

var TwitterBot = function (options)
{
    var self = this;
    var twit = new Twit(options);

    /*
     * [TwitterBot].tweet()
     *
     * Tweets the passed message.
     *
     * @param content string
     * @return Promise
     */
    this.tweet = function (content)
    {
        var promise = twit.post('statuses/update', { status: content });

        return promise;
    };

    /*
     * [TwitterBot].getTweet()
     *
     * Reads a Tweet with the given id if it exists.
     *
     * @param id string
     * @return Promise
     */
    this.getTweet = function (id)
    {
        var promise = twit.get('statuses/show/:id', { id: id });

        return promise;
    };

    /*
     * [TwitterBot].removeTweet()
     *
     * Removes a Tweet with the given id if it exists.
     *
     * @param id string
     * @return Promise
     */
    this.removeTweet = function (id)
    {
        var promise = twit.post('statuses/destroy/:id', { id: id });

        return promise;
    };

    /*
     * [TwitterBot].reply()
     *
     * Posts a tweet as a reply to the supplied User/Tweet.
     *
     * @param message string
     * @param options object { screen_name, tweet_id }
     * @return Promise
     */
    this.reply = function (message, options)
    {
        // prepend reply_to screen name to reply body (required by Twitter API)
        message = '@' + options.screen_name + ' ' + message;

        var promise = twit.post('statuses/update', { status: message, in_reply_to_status_id: options.tweet_id });

        return promise;
    };

    /*
     * [TwitterBot].retweet()
     *
     * Retweets a Tweet with the given id if it hasn't already been retweeted.
     *
     * @param id string
     * @return Promise
     */
    this.retweet = function (id)
    {
        var promise = twit.post('statuses/retweet/:id', { id: id });

        return promise;
    };

    /*
     * [TwitterBot].undoRetweet()
     *
     * Removes the Retweet based on the given Tweet id. Accepts either the
     * Retweet id or the original Tweet id.
     *
     * @param id string
     * @return Promise
     */
    this.undoRetweet = function (id)
    {
        var promise = twit.post('statuses/unretweet/:id', { id: id });

        return promise;
    };

    /*
     * [TwitterBot].getMentions()
     *
     * Returns the 20 most recent mentions (tweets containing a users’s
     * @screen_name) for the authenticated user.
     *
     * @return Promise
     */
    this.getMentions = function ()
    {
        var promise = twit.get('statuses/mentions_timeline');

        return promise;
    };

    /*
     * [TwitterBot].filteredStream()
     *
     * Returns public statuses that match one or more filter predicates.
     *
     * @param params string|array|object
     * @return Twit Stream Object
     */
    this.filteredStream = function (params)
    {
        // if the argument is a string or an array, the user is just using shorthand for setting the track
        if (typeof params === 'string' || typeof params === 'array')
        {
            params = {
                track: params
            };
        }

        var stream = twit.stream('statuses/filter', params);

        return stream;
    }

    /*
     * [TwitterBot].schedule()
     *
     * Fires the given action on the given schedule/date/time.
     *
     * @param action function
     * @param schedule string|Date
     * @return Promise
     */
    this.schedule = function (action, schedule)
    {
        return new Promise(function (resolve, reject, onCancel)
        {
            var job = Schedule.scheduleJob(schedule, function ()
            {
                resolve(action());
            });

            onCancel(function ()
            {
                job.cancel();
            });
        });
    };

    /*
     * [TwitterBot].repeat()
     *
     * Fires the given action repeatedly based on the interation time.
     *
     * @param action function
     * @param iteration int
     * @return Promise
     */
    this.repeat = function (action, iteration)
    {
        var handler = Interval(action, iteration);

        return handler;
    };
};

module.exports = TwitterBot;
