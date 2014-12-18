'use strict';


var cp          = require('child_process'),
    h           = require('../../helpers/helpers'),
    path        = require('path'),
    db          = h.getDB();



describe('notes_list', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      login();
      done();
    });
  });

  it('should get the notes page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
  });

  it('should create a note', function(){
    create('Note Title', 'Lorem Ipsum Dipsum', 'lorem,ipsum,note');

    expect(element(by.model('note.title')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.body')).getAttribute('value')).toEqual('');
    expect(element(by.model('note.tags')).getAttribute('value')).toEqual('');
    expect(element.all(by.repeater('note in notes')).count()).toBeGreaterThan(0);
    //h.debug('goldenrod');
  });

  it('should go to a note detail', function(){
    create('a', 'b', 'c,d,e');
    element(by.repeater('note in notes').row(0)).element(by.css('td:nth-child(2) > a')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('a');

  });

});

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('billy-bob');
  element(by.model('user.password')).sendKeys('1234');
  element(by.css('button[ng-click]')).click();
  browser.get('/#/notes');
}

function create(title, body, tags){
  var image = path.resolve(__dirname, '../../fixtures/usa.png');
  element(by.model('note.title')).sendKeys(title);
  element(by.model('note.body')).sendKeys(body);
  element(by.model('note.tags')).sendKeys(tags);
  element(by.css('input[type="file"]')).sendKeys(image);
  element(by.css('button[ng-click]')).click();
}
