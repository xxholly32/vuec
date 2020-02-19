module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // '@babel/es2015',
    // '@babel/stage-3',
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
};
