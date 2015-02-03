/**
 *
 */

var request = require('superagent');
var expect = require('expect.js');
var assert = require("assert")

var auth = require('./nexpress-auth.js')();

describe('Authenticate through Dummy Driver', function(){

    it('using default username and password', function(){
        expect(auth).to.exist;
        expect(auth.dummyAuth).to.exist;
    });
});

describe('Authenticate through Form Driver', function() {

    it('using json objects', function() {
        postdata = {Username: "User1", Password: "password"};
        expect(auth.formAuth).to.exist;
        //TODO
    });

});
