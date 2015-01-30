/**
 * Authenticate a user using an authentication scheme
 *
 */
var func = require('function.create');
var secretToken = 'asldjfljk3j42509880958749u5436jkkjHJESH';

(function() {

    var auth = function(sessions) {

        this.dummyAuth = function(sucessfulRedirect, failureRedirect) {

            var success = sucessfulRedirect;
            var failure = failureRedirect;

            return Function.create(null, function(req, res, data) {
                var dummy = require('./auths/dummy.js')();

                var username = data.username;
                var password = data.password;
                var allowed = dummy(username, password);
                if (allowed) {
                    sessions.create(secretToken);
                    sessions.set(secretToken, 'username', username);
                    sessions.set(secretToken, 'password', password);
                    sessions.set(secretToken, 'lastLogin', new Date());
                    success(req, res, {});
                }
                else {
                    failure(req, res, data);
                }

            });
        }
        return this;
    };
    module.exports = auth;

})();