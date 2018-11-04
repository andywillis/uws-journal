module.exports = function babelConfig(api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', {
        modules: false
      }],
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-regenerator',
    ],
    env: {
      test: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ]
      }
    }
  };
};
