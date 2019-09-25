# ejs-loader for webpack

[![npm](https://img.shields.io/npm/v/ejs-loader.svg)](https://www.npmjs.com/package/ejs-loader)
[![Build Status](https://travis-ci.com/difelice/ejs-loader.svg)](https://travis-ci.com/difelice/ejs-loader)

EJS (Underscore/LoDash Templates) loader for [webpack](http://webpack.github.io/). Uses [lodash template](http://lodash.com/docs#template) function to compile templates.

If you are looking for the loader which uses [EJS templating engine](https://github.com/tj/ejs), there is [ejs-compiled-loader](https://github.com/bazilio91/ejs-compiled-loader)

## Installation

`npm install ejs-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("ejs!./file.ejs");
// => returns the template function compiled with undesrcore (lodash) templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```

You also should provide a global `_` variable with the lodash/underscore runtime. You can do it with the following webpack plugin: https://github.com/webpack/docs/wiki/list-of-plugins#provideplugin

```
plugins: [
    new webpack.ProvidePlugin({
        _: "underscore"
    })
]
```

### Options
[Underscore](http://underscorejs.org/#template)/[Lodash](https://lodash.com/docs#template) options can be passed in using the querystring or adding an ```esjLoader``` options block to your configuration.

Config example using a querystring:
``` js
module.exports = {
  module: {
    loaders: [
      { test: /\.ejs$/, loader: 'ejs-loader?variable=data' },
    ]
  }
};
```
is equivalent to
``` js
var template = _.template('<%= template %>', { variable : 'data' });
```

``` js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.ejs$/,
                loader: 'ejs-loader',
                query: {
                    variable: 'data',
                    interpolate : '\\{\\{(.+?)\\}\\}',
                    evaluate : '\\[\\[(.+?)\\]\\]'
                }
            },
        ]
    }
};
```
is equivalent to
``` js
var template = _.template('<%= template %>', { variable: 'data', interpolate : '\\{\\{(.+?)\\}\\}', evaluate : '\\[\\[(.+?)\\]\\]' });
```

Config example using the ```ejsLoader``` config block:
``` js
module.exports = {
  module: {
    loaders: [
      { test: /\.ejs$/, loader: 'ejs-loader' }
    ]
  },
  ejsLoader : {
    variable    : 'data',
    interpolate : /\{\{(.+?)\}\}/g,
    evaluate    : /\[\[(.+?)\]\]/g
  }
};
```


### Including nested templates

Lodash template function does not provide `include` method of [ejs module](http://ejs.co/). To include other templates, passing template functions as parameters does the job. For example:

**index.js:**

    var mainTemplate = require('ejs!./main.ejs');
    var hyperlinkTemplate = require('ejs!./hyperlink.ejs');
    var renderedHtml = mainTemplate({ hyperlink: hyperlinkTemplate });

**main.ejs:**

    <h1><%= hyperlink({ name: 'Example', url: 'http://example.com' }) %></h1>

**hyperlink.ejs:**

    <a href="<%= url %>"><%= name %></a>

As a result, `renderedHtml` becomes a string `<h1><a href="http://example.com">Example</a></h1>`.



## Release History
* 0.3.5 - Fix dependency vulnerabilities.
* 0.3.3 - Fix dependency vulnerabilities.
* 0.3.0 - Allow passing template options via `ejsLoader` or via loader's `query`
* 0.2.1 - Add ability to pass compiller options
* 0.1.0 - Initial release

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
