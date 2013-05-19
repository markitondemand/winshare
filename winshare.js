var exec = require('child_process').exec,
  os = require('os'),
  path = require('path'),
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

      sharePath = path.resolve(l.replace(/^Path\s+/, ''));
      cb(null, sharePath);
      return true;
    });
  });
}

// too much of a pain due to whitespace and long share names
// function allShares( cb) `{
//   exec('net share', function(err, stdout, stderr) {
//     var lines = stdout.split(os.EOL);

//     if (err) {
//       return cb(err);
//     }

//     // trim the fat
//     lines.splice(0,4);
//     lines.splice(lines.length-3);

//     lines.forEach(function(l) {
//       console.log(l.split(/\s{2,}/));
//     });
//   });
// }

function winshare(name, cb) {
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

// winshare.all = function(cb) {
//   allShares(cb);
// }

winshare.clearCache = function() {
  errs = {};
  shares  = {};
};

module.exports = winshare;
