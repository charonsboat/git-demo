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

    this.tweet = function (content)
    {
        var promise = twit.post('statuses/update', { status: content });

        return promise;
    };

    this.scheduleTweet = function (schedule, content)
    {
        return new Promise(function (resolve, reject, onCancel)
        {
            var job = Schedule.scheduleJob(schedule, function ()
            {
                resolve(self.tweet(content));
            });

            onCancel(function ()
            {
                job.cancel();
            });
        });
    };

    this.deleteTweet = function ()
    {

    };
};

module.exports = TwitterBot;
