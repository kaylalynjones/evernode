'use strict';


var cp          = require('child_process'),
    h           = require('../../helpers/helpers'),
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

});

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('billy-bob');
  element(by.model('user.password')).sendKeys('1234');
  element(by.css('button[ng-click]')).click();
  browser.get('/#/notes');

}
