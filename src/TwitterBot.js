var Twit = require('twit');
var Schedule = require('node-schedule');
var Promise = require('bluebird');

Promise.config({
    cancellation: true
});

var TwitterBot = function (options)
{
    var self = this;
    var twit = new Twit(options);

    /*
     * [TwitterBot].tweet
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
     * [TwitterBot].scheduleTweet
     *
     * Tweets the passed message at the specified date/time.
     *
     * @param content string
     * @param schedule string|Date
     * @return Promise
     */
    this.scheduleTweet = function (content, schedule)
    {
        return this.schedule(function ()
        {
            return self.tweet(content);
        }, schedule);
    };

    this.deleteTweet = function (id)
    {
        var promise = twit.post('statuses/destroy/:id', { id: id });

        return promise;
    };

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
};

module.exports = TwitterBot;
