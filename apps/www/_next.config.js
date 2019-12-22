const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require('path');

const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')

console.log('theme path = ', path.resolve(__dirname, './static/antd-custom.less'));

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './static/antd-custom.less'), 'utf8')
)

module.exports = withCss(withSass(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },

  webpack: (config, options) => {
    // 루트에 있는 tsconfig.json의 paths 섹션의 설정값에 접근(@nx-taskman/xxx)이 가능하도록 플러그인 추가
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    
    // @nx-taskman/components 경로를 next에 인식시키기
    // next-babel-loader rule의 include 경로에 루트 tsconfig.json의 paths 섹션의 값들을 넣어준다.
    // rules 안에 rule이 여러개 있는데, 0 번째가 next-babel-loader 인 듯함. 
    // Todo: next-babel-loader rule의 순번을 찾아 0 대신 사용
    const ruleIdx = 0;
    const includes = config.module.rules[ruleIdx].include;
    includes.push(path.resolve(options.dir, '../../libs/components'));
    includes.push(path.resolve(options.dir, '../../libs/logics'));


    // ant design scss 인식시키기
    if (options.isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }

    return config;
  },
})));
