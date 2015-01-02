'use strict';

var path = require('path');
var compileManifest = require('..');
var root = process.cwd();
var fs = require('fs');
var rimraf = require('rimraf');
var broccoli = require('broccoli');
var helpers = require('broccoli-kitchen-sink-helpers');
var assertDirEqual = require('assert-dir-equal');
var expect = require('expect.js');

var dest =  '../../tmp';
var brocfile = 'test/fixtures/Brocfile.js';

function build( brocfile, options, callback ) {
  if (fs.existsSync(brocfile)) {
    var
      cwd = process.cwd(),
      dest = options.dest,
      module = "./" + path.join(path.dirname(path.relative(__dirname, brocfile)), path.basename(brocfile, path.extname(brocfile))),
      tree = require(module),
      builder = new broccoli.Builder(tree);
      
    process.chdir(path.dirname(brocfile));
    return builder.build().then(function(output) {
      rimraf.sync(dest);
      helpers.copyRecursivelySync(output.directory, dest);
      rimraf.sync('tmp');
      process.chdir(cwd);
      if (typeof callback === 'function') {
        callback(output);
      }
    });
  }
  return null;
}

describe('broccoli-mincer', function() {
  
  before(function() {
    // Clean
    rimraf.sync(dest);
  });
  
  describe('with defaults', function() {
    
    it('should match expected build', function() {
      this.timeout(10000);
      // Build
      return build(brocfile, {
        dest: dest
      }, function() {
        expect(function () {
          assertDirEqual('tmp', 'test/expected');
        }).to.not.throwException();
      });
      
      
    });
  });
});