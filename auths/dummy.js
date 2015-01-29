/**
 * Dummy authentication module used for testing
 *
 */

var _username = 'User1';
var _password = 'password';

module.exports = function() {

    this.auth = function(username, password) {

        return (username == _username) && (password == _password);
    };

    return this.auth;
};