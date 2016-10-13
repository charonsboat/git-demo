var timer = {
    interval: function (cb, time)
    {
        var start = Date.now();
        var next = start + time;

        var action = function ()
        {
            next = next + time;

            timer.timeout(action, next);

            cb();
        };

        timer.timeout(action, next);
    },
    timeout: function (cb, time)
    {
        setTimeout(function ()
        {
            cb();
        }, time - Date.now());
    }
}

module.exports = timer;
