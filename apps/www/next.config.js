const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require('path');
module.exports = {
  // 아래는 루트에 있는 tsconfig.json의 paths 섹션의 설정값에 접근(@nx-taskman/xxx)이 가능하도록 해줌
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    // @nx-taskman/components 경로를 next에 인식시키기
    // next-babel-loader rule의 include 경로에 루트 tsconfig.json의 paths 섹션의 값들을 넣어준다.
    config.module.rules[0].include.push(path.resolve(options.dir, '../../libs/components'));
    
    return config;
  },
};
