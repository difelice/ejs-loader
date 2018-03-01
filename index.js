var _ = require('lodash');
var loaderUtils = require('loader-utils');

function getOptions(context) {
  if (context.options && context.options.ejsLoader) {
    return context.options.ejsLoader;
  }
  return {};
}

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var query = loaderUtils.parseQuery(this.query);
  var options = getOptions(this);

  ['escape', 'interpolate', 'evaluate'].forEach(function(templateSetting) {
    var setting = query[templateSetting];
    if (_.isString(setting)) {
      query[templateSetting] = new RegExp(setting, 'g');
    }
  });

  var template = _.template(source, _.extend({}, query, options));
  return 'module.exports = ' + template;
};
