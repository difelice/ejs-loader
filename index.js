var _ = require('lodash');
var loaderUtils = require('loader-utils');

class UnsupportedConfiguration extends Error {}

module.exports = function(source) {
  this.cacheable && this.cacheable();
  var options = loaderUtils.getOptions(this);

  if(!options.variable){
    throw new UnsupportedConfiguration(`
      To support ES Modules, the 'variable' option must be passed to avoid 'with' statements 
      in the compiled template to be strict mode compatible. 
      Please see https://github.com/lodash/lodash/issues/3709#issuecomment-375898111
    `)
  }

  ['escape', 'interpolate', 'evaluate'].forEach(function(templateSetting) {
    var setting = options[templateSetting];
    if (_.isString(setting)) {
      options[templateSetting] = new RegExp(setting, 'g');
    }
  });

  var template = _.template(source, _.extend({}, options));
  return `export default ${template}`;
};
