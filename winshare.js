var exec = require('child_process').exec,
  os = require('os'),
  isWindows = (os.platform() == 'win32');

var errs = {}, shares = {};

function share(name, cb) {
  exec('net share ' + name, function(err, stdout, stderr) {
    var lines = stdout.split(os.EOL);

    if (err) {
      return cb(err);
    }

    lines.some(function(l) {
      var sharePath;
      if (l.indexOf('Path') !== 0) {
        return false;
      }

      sharePath = l.replace(/^Path\s+/, '');
      cb(null, sharePath);
      return true;
    });
  });
}


module.exports = function(name, cb) {
  if (!isWindows) {
    return cb(new Error('Only useful on windows.'));
  }

  if (!name) {
    return cb(new Error('Name is a required input.'));
  }

  name = name.toLowerCase();

  if (shares[name]) {
    return cb(null, shares[name]);
  }

  share(name, function(err, sharePath) {
    errs[name] = err;
    shares[name] = sharePath;
    if (cb) {
      cb(err, sharePath);
    }
  });
};
