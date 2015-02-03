/**
 * Form authentication module, specify the json key from the post data and
 * match it to a string.
 *
 */

module.exports = function() {

    this.auth = function(form_data, expected_data) {

        var compare = function(form, expected) {
            return (form == expected) && ((form !== undefined) && (expected !== undefined));
        }

        var keys = Object.keys(expected_data);
        var count = 0;
        for (var i=0; i < keys.length; i++) {
            if (compare(form_data[keys[i]], expected_data[keys[i]]) == false)
                return false;
            count++;
        }
        return keys.length == count
    };

    return this.auth;
};