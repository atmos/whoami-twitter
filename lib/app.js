// Example Twitter Express App on Heroku - Copyright Corey Donohoe <atmos@atmos.org> (MIT Licensed)
var OAuth                 = require('oauth').OAuth
var StrategyDefinition    = require('express/plugins/strategyDefinition').StrategyDefinition;

var twitterKeys           = { consumerKey: process.env["TWITTER_CONSUMER_KEY"], consumerSecret: process.env["TWITTER_CONSUMER_SECRET"] }

var anonStrategy     = new StrategyDefinition(Anonymous),
    twitterStrategy  = new StrategyDefinition(Twitter, twitterKeys)


configure(function() {
  set("root", __dirname)

  use(Logger)
  use(Cookie)
  use(Static, { path: require("path").join(__dirname, "..", "public") })
  use(Session, { lifetime: (150).seconds, reapInterval: (10).seconds })
  use(Auth, { strategies: { "anon": anonStrategy, "twitter": twitterStrategy } })
  enable("show exceptions")
})

get ('/auth/twitter', function() {
  var self = this
  self.authenticate(['twitter'], function(error, authenticated) { 
    if( authenticated ) {
      var oa= new OAuth("http://twitter.com/oauth/request_token",
                        "http://twitter.com/oauth/access_token",
                        twitterConsumerKey,
                        twitterConsumerSecret,
                        "1.0",
                        null,
                        "HMAC-SHA1");
      oa.getProtectedResource("http://twitter.com/statuses/user_timeline.xml", "GET", self.session.auth["oauth_token"], self.session.auth["oauth_token_secret"],  function (error, data) {
        sys.p('got protected resource ')
          self.respond(200, "<html><h1>Hello! Twitter authenticated user ("+self.session.auth.user.username+")</h1>"+data+ "</html>")
      });
    } else {
      self.respond(200, "<html><h1>Twitter authentication failed :( </h1></html>")
    }
  })
})

get ('/logout', function() {
  this.logout();
  this.redirect("/")
})

get("/", function() {
  this.render("index.html.haml", {
    locals: {
      remoteIp: this.connection.remoteAddress
    }
  })
})

run(parseInt(process.env.PORT || 8000), null)
