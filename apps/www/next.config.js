/* eslint-disable */
const withPlugins = require('next-compose-plugins');
// const withOptimizedImages = require('next-optimized-images');
// const withFonts = require('next-fonts');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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

    // .graphql을 ts에서 바로 import 할 수 있게 함
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
};

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
}

/**
 * withCSS 제외함. 추가하면 아래와 같은 오류가 뜨면서 실패하여 임시로 
 * 아마도 @nrwl/next 패키지안의 config.js안에서 withCSS를 이미 호출하기 때문인 것으로 추정
 * [ error ] ./styles/style.min.css
 * Error: Didn't get a result from child compiler
 */
module.exports = withPlugins(
  // 이미지 압축 지금은 필요없고, withFonts가 있으면 gaxon 폰트가 읽어지지 않는 문제 때문에 아래 주석 처리
  // [withOptimizedImages, withFonts, ], // withCSS
  [],
  webpackConfig
);
