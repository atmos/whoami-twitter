// Example Twitter Express App on Heroku - Copyright Corey Donohoe <atmos@atmos.org> (MIT Licensed)

// add the vendored express to the require path
require.paths.unshift("vendor/express/lib")
require.paths.unshift("vendor/express-auth/lib")
require.paths.unshift("vendor/oauth/lib")


// require express and its plugins
require("express")
require("express/plugins")
Object.merge(global, require('express/plugins/auth'))

//require the actual express app
require ("./lib/app")
