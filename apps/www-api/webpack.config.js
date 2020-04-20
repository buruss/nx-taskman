const graphqlPlugin = require('@nestjs/graphql/plugin');

module.exports = config => {
  const rule = config.module.rules.find((rule) => rule.loader === 'ts-loader');
  if (!rule) throw new Error('no ts-loader rule found');

  // @nestjs/graphql/plugin 을 이용해서 entity의 @Field decorator가 자동 생성되게 함
  // nest cli가 아닌 nx를 이용하여 컴파일할 때만 아래 설정이 필요함
  rule.options.getCustomTransformers = (program) => {
    return {
      before: [
        graphqlPlugin.before(
          {
            typeFileNameSuffix: [
              '.output.ts',
              '.input.ts',
              '.args.ts',
              '.entity.ts',
              '.model.ts',
            ],
          },
          program,
        ),
      ],
    };
  };

  return config;
};
