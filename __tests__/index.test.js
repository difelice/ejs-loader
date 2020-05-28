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
  it('returns template with applied parameters with supplied query variable', () => {
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

  it('returns template with applied parameters with supplied variable option', () => {
    const template = '<div>Hello <%= data.world %>!</div>';
    const params = { 
      world: 'World'
    };
    const compilerOptions = {
      // stub out options.ejsloader populated by Webpack
      options: {
        ejsLoader: {
          variable: 'data'
        }
      }
    };
    const compiled = convertTemplateStringToFunction(compileTemplate(template, compilerOptions));
    expect(compiled(params)).toBe('<div>Hello World!</div>');
  });

  it('throws error when options variable or query variable are undefined', () => {
    const template = '<div>Hello <%= args.world %>!</div>';
    expect(() => {
      compileTemplate(template)
    }).toThrowError(`
      To support ES Modules, the 'variable' option must be passed to avoid 'with' statements 
      in the compiled template to be strict mode compatible. 
      Please see https://github.com/lodash/lodash/issues/3709#issuecomment-375898111
    `);
  });
});