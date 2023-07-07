module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            'src/Components': './src/Components',
            'src/hooks': './src/hooks',
            'src/mock': './src/mock',
            'src/Reducer': './src/Reducer',
            'src/Saga': './src/Saga',
            'src/Types': './src/Types',
            'src/utils': './src/utils',
            'src/Views': './src/Views',
          },
        },
      ],
    ],
  };
};
