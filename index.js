var _ = require('lodash');
var loaderUtils = require("loader-utils");

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var options = loaderUtils.parseQuery(this.query);
  var template = _.template(source, options);
  return 'module.exports = ' + template;
};
