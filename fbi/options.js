const path = require('path')
const targets = {
  browsers: ['last 2 versions', 'safari >= 7', 'ie > 8']
}
function resolve (dir) {
  return path.join(process.cwd(), dir)
}
module.exports = {
  server: {
    root: 'dist',
    host: 'localhost',
    port: 8888,
    proxy: {
      '/proxy': 'https://api.github.com'
    }
  },
  // Compile time data (Valid only in js code)
  data: {
    all: {
      // for all environments
      __KEY__: ''
    },
    // `fbi s`
    dev: {
      __APIROOT__: '/proxy'
    },
    // `fbi b -test`
    test: {
      __APIROOT__: 'https://api.github.com'
    },
    // `fbi b` or `fbi b -p`
    prod: {
      __APIROOT__: 'https://api.github.com'
    }
  },
  sourcemap: 'source-map',
  // babel-loader options
  // Docs: https://github.com/babel/babel-loader/tree/7.x#options
  babel: {
    babelrc: false,
    presets: [
      [
        'babel-preset-env',
        {
          targets,
          modules: false,
          useBuiltIns: true
        }
      ],
      'babel-preset-stage-1'
    ]
  },
  // Postcss config (plugin-name: plugin-options)
  postcss: {
    autoprefixer: targets,
    precss: {}
  },
  paths : {
    main: 'src/main.js',
  }
}