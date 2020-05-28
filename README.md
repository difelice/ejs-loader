# ejs-loader for webpack with ECMAScript Modules

[![npm](https://img.shields.io/npm/v/@groveco/ejs-loader.svg)](https://www.npmjs.com/package/@groveco/ejs-loader)

-[![Build Status](https://circleci.com/gh/groveco/grove/tree/master.svg?style=svg&circle-token=8632f1678c04e8d05e93329fdc4949ac6a19c4dc)](https://app.circleci.com/pipelines/github/groveco/ejs-loader)

EJS (Underscore/LoDash Templates) loader for [webpack](http://webpack.github.io/) compiled as an ECMAScript module. Uses [lodash template](http://lodash.com/docs#template) function to compile templates.

If you are looking for the loader which uses [EJS templating engine](https://github.com/tj/ejs), there is [ejs-compiled-loader](https://github.com/bazilio91/ejs-compiled-loader)

## Installation

`npm install @groveco/ejs-loader`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
import template from '@groveco/ejs-loader?variable=data!./file.ejs';
// => returns the template function compiled with undesrcore (lodash) templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```
The variable option is `required` to compile EJS templates into ES compatible modules. If the `variable` option is not provided as a loader or `query` [option](https://webpack.js.org/concepts/loaders/#loader-features), an `UnsupportedConfiguration` Exception will be thrown throw. Please see https://github.com/lodash/lodash/issues/3709#issuecomment-375898111 for additional details 

You also should provide a global `_` variable with the lodash/underscore runtime. You can do it with the following webpack plugin: https://github.com/webpack/docs/wiki/list-of-plugins#provideplugin

```
plugins: [
    new webpack.ProvidePlugin({
        _: "underscore"
    })
]
```

### Options
[Underscore](http://underscorejs.org/#template)/[Lodash](https://lodash.com/docs#template) options can be passed in using the querystring or adding an options block to your configuration.

Example config with Webpack 4+
``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ejs$/,
        loader: '@groveco/ejs-loader',
        options: {
          variable: 'data',
          interpolate : '\\{\\{(.+?)\\}\\}',
          evaluate : '\\[\\[(.+?)\\]\\]'
        }
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

    import mainTemplate from 'ejs!./main.ejs';
    import hyperlinkTemplate from 'ejs!./hyperlink.ejs';
    let renderedHtml = mainTemplate({ hyperlink: hyperlinkTemplate });

**main.ejs:**

    <h1><%= hyperlink({ name: 'Example', url: 'http://example.com' }) %></h1>

**hyperlink.ejs:**

    <a href="<%= url %>"><%= name %></a>

As a result, `renderedHtml` becomes a string `<h1><a href="http://example.com">Example</a></h1>`.

## Release History
* 1.0.0-beta.1 - Inital fork of [ejs-loader](https://github.com/difelice/ejs-loader) with support for ECMA Modules and deprecating CommonsJS
* 0.3.5 - Fix dependency vulnerabilities.
* 0.3.3 - Fix dependency vulnerabilities.
* 0.3.0 - Allow passing template options via `ejsLoader` or via loader's `query`
* 0.2.1 - Add ability to pass compiller options
* 0.1.0 - Initial release

## Contributing Prerequisites

* Node >= 12.13.0
* npm >= 6.12.0

## License

MIT (http://www.opensource.org/licenses/mit-license.php)