/**
 * Authenticate a user using an authentication scheme
 *
 */
var func = require('function.create');
var cookies = require('cookies');

var secretToken = 'asldjfljk3j42509880958749u5436jkkjHJESH';

(function() {

    var auth = function(sessions) {

        this.dummyAuth = function(sucessfulRedirect, failureRedirect) {

            var success = sucessfulRedirect;
            var failure = failureRedirect;

            return Function.create(null, function(req, res, data) {
                cookies.set("session_id", secretToken, {httpOnly: true});
                var dummy = require('./auths/dummy.js')();

                var username = data.username;
                var password = data.password;
                var allowed = dummy(username, password);
                if (allowed) {
                    sessions[secretToken] = {};
                    sessions[secretToken]['username'] = username;
                    sessions[secretToken]['password'] = password;
                    sessions[secretToken]['lastLogin'] = new Date();
                    success(req, res, data);
                }
                else {
                    failure(req, res, data);
                }

            });
        }

        this.formAuth = function(formExpected, success, failure) {
            var success = success;
            var failure = failure;

            return Function.create(null, function(req, res, data) {
                var forms = require("./auths/forms.js")();
                var allowed = forms(data, formExpected);
                if (allowed) {
                    sessions[secretToken] = {};
                    var keys = Object.keys(data);
                    for (var i=0; i < keys.length; i++)
                        sessions[secretToken][keys[i]] = data[keys[i]];

                    sessions[secretToken]['lastLogin'] = new Date();
                    success(req, res, data);
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