var _ = require('lodash');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var options = loaderUtils.getOptions(this) || {};

  ['escape', 'interpolate', 'evaluate'].forEach(function(templateSetting) {
    var setting = options[templateSetting];
    if (_.isString(setting)) {
      options[templateSetting] = new RegExp(setting, 'g');
    }
  });

  var template = _.template(source, _.extend({}, options));
  return 'module.exports = ' + template;
};
