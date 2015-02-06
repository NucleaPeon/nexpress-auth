/**
 * Form authentication module, specify the json key from the post data and
 * match it to a string.
 *
 */

module.exports = function() {

    var compare = function(form, expected) {
        return (form == expected) && ((form !== undefined) && (expected !== undefined));
    }

    /**
     * Authentication for forms, ensuring each key has a value that is met
     *
     */
    this.auth = function(form_data, expected_data) {
        var keys = Object.keys(expected_data);
        var count = 0;
        try {
            for (var i=0; i < keys.length; i++) {
                if (compare(form_data[keys[i]], expected_data[keys[i]]) == false)
                    return false;
                count++;
            }
            return keys.length == count;
        }
        catch (error) {
            console.log(error);
            console.log("Authentication failed on auth()");
            return false;
        }
    };

    /**
     * Authentication for sessions, ensuring the JSON supplied has its values
     * met, regardless of the quantity of values supplied to check against.
     *
     * Authentication proceeds when the session all of its values matched.
     *
     */
    this.sauth = function(session, expected_data) {
        var keys = Object.keys(expected_data);
        try {
            for (var i=0; i < keys.length; i++) {
                if (compare(session[keys[i]], expected_data[keys[i]]) == false)
                    return false;
            }
            return true;
        }
        catch (error) {
            console.log(error);
            console.log("Authentication failed on sauth()");
            return false;
        }
    };

    return this;
};