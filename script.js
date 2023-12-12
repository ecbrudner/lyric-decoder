//user enters song name and lyrics are displayed
//user enters word from lyrics and definition is displayed 

let colors = require('./lib/public/colors')
module.exports = (colors.__esModule ? colors : { default: colors }).default

module.exports = {
  // These settings are duplicated in .editorconfig:
  tabWidth: 2, // indent_size = 2
  useTabs: false, // indent_style = space
  endOfLine: 'lf', // end_of_line = lf
  semi: false, // default: true
  singleQuote: true, // default: false
  printWidth: 100, // default: 80
  trailingComma: 'es5',
  bracketSpacing: true,
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'flow',
      },
    },
  ],
}

fetchButton.addEventListener('click', getApi);
