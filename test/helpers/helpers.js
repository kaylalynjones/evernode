'use strict';

exports.getDB = function(){
  return process.env.DATABASE_URL.match(/\/([\w]+$)/)[1];
};

exports.random = function(num){
  return Math.floor(Math.random() * num);
};
