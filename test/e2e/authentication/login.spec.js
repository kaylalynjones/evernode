'use strict';


var cp          = require('child_process'),
    h           = require('../../helpers/helpers'),
    db          = h.getDB();



describe('login', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      done();
    });
  });
  it('should get the login page', function(){
    browser.get('/#/login');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });
  it('should not login a user', function(){
    element(by.model('user.username')).sendKeys('billy-bob');
    element(by.model('user.password')).sendKeys('124');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });
  it('should login user', function(){
    element(by.model('user.username')).sendKeys('billy-bob');
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
  });

});
