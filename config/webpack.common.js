const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const PugPlugin = require('pug-plugin')
const paths = require('./paths') // Импортируем пути


const fs = require('fs')
const path = require('path')

function generateHtmlPlugins(templateDir) {
  // Генерируем список html файлов для плагина html-webpack-plugin

  // const templateFiles = fs.readdirSync(paths.resolve(__dirname, templateDir));
  const templateFiles = fs.readdirSync(templateDir);
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      // inject: false, // Вставлять секции скриптов и стилей в итоговый файл
    })
  })
}

const htmlPlugins = generateHtmlPlugins(paths.html)

// const pugDir = `${paths.pug}`
const htmlPages = fs.readdirSync(paths.html).filter(fileName => fileName.endsWith('.html'))
const pugPages = fs.readdirSync(paths.pug).filter(fileName => fileName.endsWith('.pug'))


module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/index.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: paths.js,
          to: 'js',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
        {
          from: `${paths.plugins}/**/*`,
          to: '',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // new PugPlugin({
    //   pretty: true,
    //   //☝🏽 Format HTML (only in dev mode)
    //   extractCss: {
    //     filename: 'assets/css/[name].[contenthash:8].css'
    //   }
    // }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    //  new HtmlWebpackPlugin({
    //   title: 'webpack Boilerplate',
    //   favicon: paths.src + '/images/favicon.png',
    //   template: paths.src + '/[name].html', // template file
    //   filename: '[name].html', // output file
    // }),

    // Automatic creation any html pages (Don't forget to RERUN dev server)
    // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
    // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
    ...pugPages.map(page => new HtmlWebpackPlugin({
      template: `${paths.pug}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
    ...htmlPages.map(page => new HtmlWebpackPlugin({
      template: `${paths.html}/${page}`,
      filename: `./${page}`
    })),


   ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      //☝🏽 Load Pug files
      // { test: /\.pug$/, loader: PugPlugin.loader},
      { test: /\.pug$/, use: ['pug-loader']},

      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
