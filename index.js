var lodashTemplate = require('lodash/template');
var lodashExtend = require('lodash/extend');
var lodashIsString = require('lodash/isString');
var loaderUtils = require('loader-utils');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var options = loaderUtils.getOptions(this) || {};

  if (options.exportAsESM && !options.variable) {
    throw new Error(`
      To support ES Modules, the 'variable' option must be passed to avoid 'with' statements
      in the compiled template to be strict mode compatible.
      Please see https://github.com/lodash/lodash/issues/3709#issuecomment-375898111
    `);
  }

  ['escape', 'interpolate', 'evaluate'].forEach(function (templateSetting) {
    var setting = options[templateSetting];
    if (lodashIsString(setting)) {
      options[templateSetting] = new RegExp(setting, 'g');
    }
  });

  var template = lodashTemplate(source, lodashExtend({}, options));
  return options.exportAsESM
    ? `export default ${template}`
    : `module.exports = ${template}`;
};
