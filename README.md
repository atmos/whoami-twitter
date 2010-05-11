whoami-twitter
==============

This is basically my Twitter Hello World app to test out [heroku's][heroku] experimental [node.js][node] support.

It uses [express][express] and [express-auth][express-auth].

Running
=======

    % heroku config add TWITTER_CONSUMER_SECRET=<secretfromtwitter> TWITTER_CONSUMER_KEY=<keyfromtwitter>
    % git push heroku master

[heroku]: http://heroku.com
[node]: http://nodejs.org
[kiwi]: http://github.com/visionmedia/kiwi
[express]: http://github.com/visionmedia/express
[express-auth]: http://github.com/ciaranj/express-auth
