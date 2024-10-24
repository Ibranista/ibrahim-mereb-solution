if (process.env.NODE_ENV === 'development') {
  const { createProxyMiddleware } = require('http-proxy-middleware');

  module.exports = function(app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://loripsum.net',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      })
    );
  };
}