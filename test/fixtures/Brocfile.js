'use strict';

var path = require('path');
var minceTree = require('../..');
var fs = require('fs');
var broccoli = require('broccoli');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require("broccoli-static-compiler");
var jade = require('broccoli-jade');

// Setup base url
var baseURL = ".";

// Compile assets
var assetsTree = minceTree('app', {
  allowNone: true,
  inputFiles: [
    'assets/javascripts/app.*', 
    'assets/stylesheets/app.*', 
    'assets/images/**/*'
  ],
  manifest: 'manifest.json',
  sourceMaps: true,
  embedMappingComments: true, 
  compress: false,
  cssProcessor: 'csso',
  jsCompressor: 'uglify',
  enable: [
    'autoprefixer'
  ],
  engines: {
    Coffee: {
      bare: true
    }
  },
  paths: [
    '../vendor/assets/components', 
    'assets/javascripts', 
    'assets/stylesheets', 
    'assets/images'
  ],
  helpers: {
    asset_path: function(pathname, options) {
      var asset = this.environment().findAsset(pathname, options);
      if (!asset) {
        throw new Error('File ' + pathname + ' not found');
      }
      return path.join(baseURL, asset.digestPath);
    }
  }
});


var locals = {
  title: 'broccoli-mincer', 
  subtitle: 'example',
  description: 'Mince broccoli with sprockets'
};

locals.javascript = function javascript(logicalPath) {
  var environment = assetsTree.environment();
  var asset = environment.findAsset(logicalPath);
  if (!asset) {
    // this will help us notify that given logicalPath is not found
    // without "breaking" view renderer
    return '<script type="application/javascript">throw("Javascript file ' +
           JSON.stringify(logicalPath).replace(/"/g, '\\"') +
           ' not found.")</script>';
  }
  var source = asset.digestPath, ext = ".js";
  var uri = path.join(baseURL, (path.extname(source) === ext) ? source : path.join(source, ext));
  return '<script type="application/javascript" src="' +
    uri +
    '"></script>';
};

locals.stylesheet = function stylesheet(logicalPath) {
  var environment = assetsTree.environment();
  var asset = environment.findAsset(logicalPath);
  if (!asset) {
    // this will help us notify that given logicalPath is not found
    // without "breaking" view renderer
    return '<script type="application/javascript">throw("Stylesheet file ' +
      JSON.stringify(logicalPath).replace(/"/g, '\\"') +
      ' not found.")</script>';
  }
  var source = asset.digestPath, ext = ".css";
  var uri = path.join(baseURL, (path.extname(source) === ext) ? source : path.join(source, ext));
  return '<link rel="stylesheet" type="text/css" href="' +
    uri +
    '" />';
};

var jadeTree = jade('app/views', {data: locals});
var tree = mergeTrees([assetsTree, jadeTree], {overwrite: true});

module.exports = tree;