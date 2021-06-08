import { createProxyMiddleware } from 'http-proxy-middleware';
import { SERVER_URL } from './config';

module.exports = function(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `${SERVER_URL}`,
      changeOrigin: true,
    })
  );
};