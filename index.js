
const { isString, template, extend } = require('lodash');
const { parseQuery } = require('loader-utils');

module.exports = (source) => {
  this.cacheable && this.cacheable();
  const query = parseQuery(this.query);
  const options = this.options.ejsLoader || {};

  ['escape', 'interpolate', 'evaluate'].forEach((templateSetting) => {
    const setting = query[templateSetting];
    if (isString(setting)) {
      query[templateSetting] = new RegExp(setting, 'g');
    }
  });

  return `module.exports = ${template(source, extend({}, query, options))}`;
};
