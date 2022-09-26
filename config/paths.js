const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),
  
  // Js files
  js: path.resolve(__dirname, '../src/js'),

  // Production build files
  build: path.resolve(__dirname, '../dist'),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),

  // Папка с Html страницами
  html: path.resolve(__dirname, '../src/html'),
  
  // Папка с Pug страницами
  pug: path.resolve(__dirname, '../src/pug'),

  // Папка с Plugins
  plugins: path.resolve(__dirname, '../plugins'),
  
  // Спрайт с иконками
  // iconSprite: path.resolve(__dirname, '../src/html'),
}
