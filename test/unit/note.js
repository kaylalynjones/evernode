/* jshint expr:true */
'use strict';

var expect  = require('chai').expect,
cp          = require('child_process'),
h           = require('../helpers/helpers'),
Note        = require('../../server/models/note'),
Lab         = require('lab'),
lab         = exports.lab = Lab.script(),
describe    = lab.describe,
it          = lab.it,
db          = h.getDB(),
fs          = require('fs'),
beforeEach  = lab.beforeEach;



describe('Note', function(){
  var noteId;
  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      Note.create({id:2}, {title:'a', body:'b', tags:'c,d,e'}, function(err, results){
        noteId = results;
        done();
      });
    });
  });

  describe('constructor', function(){
    it('should create a Note object', function(done){
      var note = new Note();

      expect(note).to.be.instanceof(Note);
      done();
    });
  });

  describe('.create', function(){
    it('should create a note', function(done){
      Note.create({id:2}, {title:'a',body:'b',tags:'c,d,e'}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.be.above(0);
        done();
      });
    });
  });

  describe('.show', function(){
    it('should show a note', function(done){
      Note.show({id:2}, noteId, function(err, results){
        expect(err).to.be.null;
        expect(results.title).to.equal('a');
        done();
      });
    });
  });

  describe('.nuke', function(){
    it('should nuke a note', function(done){
      Note.nuke({id:2}, noteId, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal(noteId);
        done();
      });
    });
  });

  describe('.count', function(){
    it('should count notes from a user', function(done){
      Note.count({id:2}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.equal('1');
        done();
      });
    });
  });

  describe('.query', function(){
    it('should query notes from a user', function(done){
      Note.query({id:2}, {}, function(err, results){
        expect(err).to.be.null;
        expect(results).to.have.length(1);
        done();
      });
    });
  });

  describe('.uploadmobile', function(){
    it('should upload a b64 mobile photo', function(done){
      Note.uploadmobile({token:'tok'}, 'b64image', noteId, function(err, results){
        expect(err).to.be.null();
        done();
      });
    });
  });

  describe('.upload', function(){
    it('should upload a photo', function(done){
      var file = fs.createReadStream(__dirname + '/../fixtures/usa.png');
      Note.upload({token:'tok'}, file, 'usa.png', noteId, function(err, results){
        expect(err).to.be.null();
        done();
      });
    });
  });

});
