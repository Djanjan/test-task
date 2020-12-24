module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : '',
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
};
