# ejs-loader for webpack

EJS (Underscore/LoDash Templates) loader for [webpack](http://webpack.github.io/). Uses [lodash template](http://lodash.com/docs#template) function to compile templates.

If you are looking for the loader which uses [EJS templating engine](https://github.com/tj/ejs), there is [ejs-compiled-loader](https://github.com/bazilio91/ejs-compiled-loader)

## Installation

`npm install ejs-loader`

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/)

``` javascript
var template = require("./file.ejs");
// => returns the template function compiled with undesrcore (lodash) templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```

### Options
[Underscore](http://underscorejs.org/#template)/[Lodash](https://lodash.com/docs#template) options can be passed in using the querystring or adding an ```esjLoader``` options block to your configuration.

Config example using a querystring:
``` js
module.exports = {
  module: {
    rules: [
      { test: /\.ejs$/, use: [{loader: 'ejs-loader', options: { variable: 'data'}] },
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
        rules: [
            {
                test: /\.ejs$/,
                use: [{
                    loader: 'ejs-loader',
                    options: {
                        variable: 'data',
                        interpolate : '\\{\\{(.+?)\\}\\}', 
                        evaluate : '\\[\\[(.+?)\\]\\]' 
                    }
                ]
            }
        ]
    }
};
```
is equivalent to
``` js
var template = _.template('<%= template %>', { variable: 'data', interpolate : '\\{\\{(.+?)\\}\\}', evaluate : '\\[\\[(.+?)\\]\\]' });
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
* 0.3.1 - Make it compatible with Webpack 3.0 and update dependencies
* 0.3.0 - Allow passing template options via `ejsLoader` or via loader's `query`
* 0.2.1 - Add ability to pass compiller options
* 0.1.0 - Initial release

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
