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
    // rules 안에 rule이 여러개 있는데, 0 번째가 next-babel-loader 인 듯함. 
    // Todo: next-babel-loader rule의 순번을 찾아 0 대신 사용
    const ruleIdx = 0;
    const includes = config.module.rules[ruleIdx].include;
    includes.push(path.resolve(options.dir, '../../libs/components'));
    includes.push(path.resolve(options.dir, '../../libs/logics'));

    return config;
  },
};
