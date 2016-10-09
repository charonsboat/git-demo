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
     * [TwitterBot].deleteTweet
     *
     * Removes a Tweet with the given id if it exists.
     *
     * @param id string
     * @return Promise
     */
    this.deleteTweet = function (id)
    {
        var promise = twit.post('statuses/destroy/:id', { id: id });

        return promise;
    };

    /*
     * [TwitterBot].schedule
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
};

module.exports = TwitterBot;
