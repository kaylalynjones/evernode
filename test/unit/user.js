/* jshint expr:true */
'use strict';

var expect      = require('chai').expect,
    cp          = require('child_process'),
    h           = require('../helpers/helpers'),
    User        = require('../../server/models/user'),
    Lab         = require('lab'),
    lab         = exports.lab = Lab.script(),
    describe    = lab.describe,
    it          = lab.it,
    db          = h.getDB(),
    //before      = lab.before,
    beforeEach  = lab.beforeEach;



describe('User', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a User object', function(done){
      var user = new User({username:'bob'});

      expect(user).to.be.instanceof(User);
      expect(user.username).to.equal('bob');
      done();
    });
  });

  describe('.register', function(){
    it('should register a new user', function(done){
      User.register({username:'bob', password:'1234', avatar:'https://www.apple.com/global/elements/flags/16x16/usa_2x.png'}, function(err){
        expect(err).to.be.null;
        done();
      });
    });
  });


});//end
