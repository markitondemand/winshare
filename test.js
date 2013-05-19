var assert = require('assert');
var winshare = require('./winshare');

winshare('c$', function(err, data) {
  assert.ok(!err);
  assert.equal(data.toLowerCase(), 'c:\\');
});
