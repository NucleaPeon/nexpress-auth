/**
 *
 */

var request = require('superagent');
var expect = require('expect.js');
var assert = require("assert")

var auth = require('./nexpress-auth.js');

describe('Authenticate through Dummy Driver', function(){
  it('using default username and password', function(){
      expect(auth).to.exist;
      expect(auth.authenticate).to.exist;
      var failed = false;
      auth.auth("user1", "hello", function() {
          console.log("Success");
      }, function() {
          console.log("Failure");
          failed = true;
      });
      assert.equal(failed, true);


  });
});
