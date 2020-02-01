/* eslint-disable */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const { ANALYZE } = process.env;

const webpackConfig = {
  webpack: (config, options) => {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }

    // @nx-taskman/components 경로를 next에 인식시키기
    // next-babel-loader rule의 include 경로에 루트 tsconfig.json의 paths 섹션의 값들을 넣어준다.
    // rules 안에 rule이 여러개 있는데, 0 번째가 next-babel-loader 인 듯함. 
    // 루트에 있는 tsconfig.json의 paths 섹션의 설정값에 접근(@nx-taskman/xxx)이 가능하도록 플러그인 추가
    config.resolve.plugins.push(new TsconfigPathsPlugin());
    // 아래와 같이 경로 설정 필요. 그렇지 않으면 jsx parsing 실패함
    const rule = config.module.rules.find(item => item.use.loader === 'next-babel-loader');
    if (rule) {
      rule.include.push(path.resolve(options.dir, '../../libs/components'));
      rule.include.push(path.resolve(options.dir, '../../libs/logics'));
    }

    // config.module.rules.push({
    //   test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 100000,
    //       name: '[name].[ext]'
    //     }
    //   }
    // });
    
    return config;
  },
};

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

/** 아래 withCSS를 추가하면 아래와 같은 오류가 뜨면서 실패하여 임시로 주석 처리함
 * [ error ] ./styles/style.min.css
 * Error: Didn't get a result from child compiler
 */
module.exports = withPlugins(
  [withOptimizedImages, withFonts, withCSS], //
  webpackConfig
);
