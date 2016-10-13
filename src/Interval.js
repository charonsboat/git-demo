var interval = function (cb, time)
{
    var id    = 0;
    var start = Date.now();
    var next  = start + time;

    var tick = function ()
    {
        next = next + time;

        id = setTimeout(tick, next - Date.now());

        cb();
    };

    id = setTimeout(tick, next - Date.now());

    this.cancel = function ()
    {
        clearTimeout(id);
    };
};

var intervalHandler = function (cb, time)
{
    return new interval(cb, time);
};

module.exports = intervalHandler;
