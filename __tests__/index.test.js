const ejsLoader = require('../index.js');

const compileTemplate = (template, mockedLoaderContext = {}) => {
  const mergedMockedLoaderContext = {
    cacheable: null,
    ...mockedLoaderContext
  };

  return ejsLoader.call(mergedMockedLoaderContext, template);
}

const convertTemplateStringToFunction = (templateString) => {
  const removeExportDefaultString = templateString.match(/export default (.*)/s)[1];
  return new Function(`return ${removeExportDefaultString}`)();
}

describe('ejsLoader', () => {
  it('returns template with applied parameters', () => {
    const template = '<div>Hello <%= args.world %>!</div>';
    const params = { 
      world: 'World'
    };
    const compilerOptions = {
      query: {
        variable: 'args'
      }
    };
    const compiled = convertTemplateStringToFunction(compileTemplate(template, compilerOptions));
    expect(compiled(params)).toBe('<div>Hello World!</div>');
  });
});