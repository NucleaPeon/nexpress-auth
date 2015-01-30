/**
 * Authenticate a user using an authentication scheme
 *
 */
var func = require('function.create');
var secretToken = 'asldjfljk3j42509880958749u5436jkkjHJESH';

(function() {

    var auth = function(sessions) {

        this.dummyAuth = function() {
            return Function.create(null, function(req, res, data) {
                var dummy = require('./auths/dummy.js')();

                console.log("Dummy auth created for User1");
                var username = data.username;
                var password = data.password;
                var allowed = dummy(username, password);
                console.log(allowed);
                if (allowed) {
                    sessions.create(secretToken);
                    sessions.set(secretToken, 'username', username);
                    sessions.set(secretToken, 'password', password);
                    console.log("last login: " + sessions.get(secretToken, 'lastLogin'));
                    sessions.set(secretToken, 'lastLogin', new Date());
                }
            });
        }
        return this;
    };
    module.exports = auth;

})();