/**
 * Authenticate a user using an authentication scheme
 *
 */
var dummyAuth = require('./auths/dummy.js')();
var sessions = require('node-simple-sessions');
var secretToken = 'asldjfljk3j42509880958749u5436jkkjHJESH';

this.auth = function(username, password, success, failure) {
    var allowed = dummyAuth(username, password);
    if ((success !== undefined) && allowed) {
        sessions.create(secretToken);
        sessions.set(secretToken, 'username', username);
        sessions.set(secretToken, 'password', password);
        console.log("last login: " + sesssions.get(secretToken, 'lastLogin'));
        sessions.set(secretToken, 'lastLogin', new Date());
        success();
    }
    else {
        if (failure !== undefined)
            failure();
    }

}

module.export = this.auth;