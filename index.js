var lodashTemplate = require('lodash/template');
var lodashExtend = require('lodash/extend');
var lodashIsString = require('lodash/isString');
var loaderUtils = require('loader-utils');

module.exports = function (source) {
  this.cacheable && this.cacheable();
  var options = loaderUtils.getOptions(this) || {};
  var useESModule = options.esModule !== false;

  if (useESModule && !options.variable) {
    throw new Error(`
      To support the 'esModule' option, the 'variable' option must be passed to avoid 'with' statements
      in the compiled template to be strict mode compatible. Please see https://github.com/lodash/lodash/issues/3709#issuecomment-375898111.
      To enable CommonJS, please set the 'esModule' option to false.
    `);
  }

  ['escape', 'interpolate', 'evaluate'].forEach(function (templateSetting) {
    var setting = options[templateSetting];
    if (lodashIsString(setting)) {
      options[templateSetting] = new RegExp(setting, 'g');
    }
  });

  var template = lodashTemplate(source, lodashExtend({}, options));
  return useESModule
    ? `export default ${template}`
    : `module.exports = ${template}`;
};
