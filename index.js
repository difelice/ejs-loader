var _ = require('lodash');
var loaderUtils = require('loader-utils');

class UnsupportedConfiguration extends Error {}

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

  if(!options.variable && !query.variable){
    throw new UnsupportedConfiguration(`
      To support ES Modules, the 'variable' option must be passed to avoid 'with' statements 
      in the compiled template to be strict mode compatible. 
      Please see https://github.com/lodash/lodash/issues/3709#issuecomment-375898111
    `)
  }

  ['escape', 'interpolate', 'evaluate'].forEach(function(templateSetting) {
    var setting = query[templateSetting];
    if (_.isString(setting)) {
      query[templateSetting] = new RegExp(setting, 'g');
    }
  });

  var template = _.template(source, _.extend({}, query, options));
  return `export default ${template}`;
};
