# ejs-loader for webpack

EJS (Underscore/LoDash Templates) loader for [webpack](http://webpack.github.io/). Uses [lodash template](http://lodash.com/docs#template) function to compile templates.

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

## License

MIT (http://www.opensource.org/licenses/mit-license.php)



