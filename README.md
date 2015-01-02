broccoli-mincer
===============

> Mince broccoli with sprockets

This broccoli-plugin let's you integrate mincer sprockets engine with your build.

Basic Usage
-----------

```js
// Brocfile.js
var minceTree = require('broccoli-mincer');

var assetsTree = minceTree('app', {
  inputFiles: [
    'assets/javascripts/app.*',
    'assets/stylesheets/app.*',
    'assets/images/**/*'
  ],
  paths: [
    '../vendor/assets/components', 
    'assets/javascripts', 
    'assets/stylesheets', 
    'assets/images'
  ]
});
```


### Options

#### options.allowNone
Type: `Boolean`
Default value: `false`

Allows for empty file paths in broccoli's globbing pattern

#### options.compress
Type: `Boolean`
Default value: `false`

Specifies whether to gzip assets.

#### options.embedMappingComments
Type: `Boolean`
Default value: `false`

Specifies whether to embed source-map comments into the merged assets.

#### options.enable
Type: `Array`
Default value: `[]`

An array containing features to be enabled in the environment

#### options.engines
Type: `Object`
Default value: `{}`

An object containing configuration options for each of mincer's engines.

#### options.helpers
Type: `Object`
Default value: `{}`

An object containing helper methods to be available during build.

#### options.manifest
Type: `String`
Default value: `"manifest.json"`

Specifies the path to assets manifest.

#### options.sourceMaps
Type: `Boolean`
Default value: `false`

Specifies whether to compile source-maps. When set, the corresponding environment-feature is auto-enabled.

#### options.paths
Type: `Array`
Default value: `[]`

An array containing paths to be included in the environment

### Methods

#### environment
Retrieves the environment associated with the builder. Use this method to generate asset-paths in your view-helpers: 


Example
=======

See tests for a more complete example of building a mincer sample-app using broccoli.

```cli
npm test
```


