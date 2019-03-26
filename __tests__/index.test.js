const requireFromString = require('require-from-string');
const ejsLoader = require('../index.js');

describe('ejsLoader', function() {
  it('returns template with applied parameters', function() {
    const template = '<div>Hello <%= world %>!</div>';
    const params = { world: 'World' };
    const compiled = requireFromString(ejsLoader(template));

    expect(compiled(params)).toBe('<div>Hello World!</div>');
  });
});
