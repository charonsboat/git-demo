var Twit = require('twit');
var dotenv = require('dotenv');

dotenv.config();

var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

T.post('statuses/update', { status: '[This is a bot] Hello, world!' }, function (err, data, res)
{
    console.log('data: ', data);
});
