/**
 * Authenticate a user using an authentication scheme
 * TODO: Eliminate any results that are true because of null or undefined or NaN values
 */
var func = require('function.create');
var Cookies = require('cookies');

var secretToken = 'asldjfljk3j42509880958749u5436jkkjHJESH';
var t = {};

(function() {

    var auth = function(template) {

        t = (template !== undefined) ? template : {};

        this.dummyAuth = function(sessions, sucessfulRedirect, failureRedirect) {

            var success = sucessfulRedirect;
            var failure = failureRedirect;

            return Function.create(null, function(req, res, data) {
                // TODO: use req/res to create unique session id?
                var cookies = new Cookies(req, res);
                cookies.set("session_id", secretToken, {httpOnly: true});

                var dummy = require('./auths/dummy.js')();
                var username = data.username;
                var password = data.password;
                var allowed = dummy(username, password);
                if (allowed) {
                    sessions[secretToken] = t;
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

        /**
         * Compares the POST data with the formExpected data
         */
        this.formAuth = function(sessions, formExpected, success, failure) {
            var success = success;
            var failure = failure;

            return Function.create(null, function(req, res, data) {
                // TODO: use req/res to create unique session id?
                var cookies = new Cookies(req, res);
                cookies.set("session_id", secretToken, {httpOnly: true});
                var forms = require("./auths/forms.js")();
                var allowed = forms.auth(data, formExpected);
                if (allowed) {
                    sessions[secretToken] = t;
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

        this.sessionAuth = function(sessions, expectedValues, success, failure) {
            var success = success;
            var failure = failure;

            return Function.create(null, function(req, res, data) {
                var cookies = new Cookies(req, res);
                var secretToken = cookies.get("session_id", {httpOnly: true});
                if (secretToken === undefined) {
                    console.log("Secret Token Invalid");
                    failure(req, res, data);
                    return;
                }
                var forms = require("./auths/forms.js")();
                if (sessions[secretToken] !== undefined) {
                    // Cookie exists on client
                    var allowed = forms.sauth(sessions[secretToken], expectedValues);
                    if (allowed) {
                        // Maybe do a "last seen" value here?
                        success(req, res, data);
                    }
                    else {
                        failure(req, res, data);
                    }
                }
                else {
                    failure(req, res, data);
                }
            });
        }

        /**
         * This authentication method allows success to be called
         * when the session id found in the users cookie exists in
         * the node.js stored session object.
         *
         * Basically, if user has been found to have valid authentication,
         * this succeeds.
         *
         * Otherwise (no session), fail.
         */
        this.validcookieAuth = function(sessions, success, failure) {
            var success = success;
            var failure = failure;

            return Function.create(null, function(req, res, data) {
                var cookies = new Cookies(req, res);
                var secretToken = cookies.get("session_id", {httpOnly: true});
                if (sessions[secretToken] !== undefined) {
                    success(req, res, data);
                }
                else {data
                    failure(req, res, data);
                    return
                }
            });
        }

        this.revoke = function(sessions, success, failure) {
            return Function.create(null, function(req, res, data) {
                var cookies = new Cookies(req, res);
                var secretToken = cookies.get("session_id", {httpOnly: true});
                if (secretToken === undefined) {
                    failure(req, res, data);
                    return;
                }
                if (sessions[secretToken] !== undefined) {
                    delete sessions[secretToken];
                    success(req, res, data);
                }
                else {
                    failure(req, res, data)
                }
            });
        }


        return this;
    };
    module.exports = auth;

})();