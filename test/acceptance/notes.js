/* jshint expr:true */
'use strict';

var expect      = require('chai').expect,
cp          = require('child_process'),
h           = require('../helpers/helpers'),
server      = require('../../server/index'),
Lab         = require('lab'),
lab         = exports.lab = Lab.script(),
describe    = lab.describe,
it          = lab.it,
db          = h.getDB(),
beforeEach  = lab.beforeEach;

// {method: 'post',   path: '/notes/{noteId}/upload',        config: require('../definitions/notes/upload')},
// {method: 'post',   path: '/notes/{noteId}/upload-mobile', config: require('../definitions/notes/upload-mobile')},
// {method: 'get',    path: '/notes/{noteId}',               config: require('../definitions/notes/show')},
// {method: 'delete', path: '/notes/{noteId}',               config: require('../definitions/notes/nuke')},
// {method: 'get',    path: '/notes/count',

describe('Note', function(){
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
      // notes = {
      //   method: 'post',
      //   url: '/notes',
      //   headers: {
      //     cookie:cookie
      //   },
      //   payload:{
      //     title:'Note Two',
      //     body:'Lorem ipsum dipsum',
      //     tags:'two,lorem,ipsum',
      //     noteId: 200
      //   }
      // };
      // server.inject(notes, function(response){
      //   console.log(response);
      // });
      server.inject(options, function(response){
        cookie = response.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });
    });
  });

  describe('post /notes', function(){
    it('should create a new Note', function(done){
      var options = {
        method: 'post',
        url: '/notes',
        headers: {
          cookie:cookie
        },
        payload:{
          title:'Note One',
          body:'Lorem ipsum dipsum',
          tags:'one,lorem,ipsum'
        }
      };
      server.inject(options, function(response){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  // ERROR: 400 'username is required'
  // describe('get /notes/count', function(){
  //   it('should get number of users notes', function(done){
  //     var options = {
  //       method: 'post',
  //       url: '/login',
  //       headers: {
  //         cookie:cookie
  //       }
  //     };
  //     server.inject(options, function(response){
  //       console.log(response);
  //       expect(response.statusCode).to.equal(200);
  //       done();
  //     });
  //   });
  // });

  describe('get /notes', function(){
    it('should return a Users notes', function(done){
      var options = {
        method: 'get',
        url: '/notes',
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

  describe('get /notes/1', function(){
    it('should get a particular note', function(done){
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
