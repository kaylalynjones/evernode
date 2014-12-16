/* jshint expr:true */
'use strict';

var expect      = require('chai').expect,
cp          = require('child_process'),
h           = require('../helpers/helpers'),
//User        = require('../../server/models/user'),
server      = require('../../server/index'),
Lab         = require('lab'),
lab         = exports.lab = Lab.script(),
describe    = lab.describe,
it          = lab.it,
db          = h.getDB(),
beforeEach  = lab.beforeEach;



describe('User', function(){
  var cookie;

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      var options = {
        method: 'post',
        url: '/login',
        payload:{
          username: 'billy-bob',
          password: '1234'
        }
      };

      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });

    });
  });

  describe('post /register', function(){
    it('should register a new User', function(done){
      var options = {
        method: 'post',
        url: '/register',
        payload:{
          username: 'sam',
          password: '456',
          avatar: 'https://www.apple.com/global/elements/flags/16x16/usa_2x.png'
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('post /login', function(){
    it('should login a User', function(done){
      var options = {
        method: 'post',
        url: '/login',
        payload:{
          username: 'billy-bob',
          password: '1234'
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        expect(response.result.username).to.equal('billy-bob');
        done();
      });
    });
  });

  describe('delete /logout', function(){
    it('should logout a User', function(done){
      var options = {
        method: 'delete',
        url: '/logout',
        headers: {
          cookie:cookie
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /status', function(){
    it('should get a status for a User', function(done){
      var options = {
        method: 'get',
        url: '/status',
        headers: {
          cookie:cookie
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});//end
