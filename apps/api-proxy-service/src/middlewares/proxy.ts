import { Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { loggerMiddleware } from './logger';
import { ensureAuthenticated } from './ensureAuthenticated'

export function configureProxies(app: Express) {
  const nboDataServiceAddress = process.env.NBO_DATA_SERVICE_URL + ':' + process.env.NBO_DATA_SERVICE_PORT;
  const maps4ServiceAddress = process.env.MAPS4_API_SERVICE_URL + ':' + process.env.MAPS4_API_SERVICE_PORT;

  // Proxy route for nbo-data-service
  app.use(
    '/v1/data',
    loggerMiddleware,
    createProxyMiddleware({
      target: nboDataServiceAddress,
      changeOrigin: true,
      pathRewrite: (path, req) => '/api' + path,
    })
  );

  app.use('/maps', ensureAuthenticated, (req, res, next) => {
    const loginkey = req.session?.loginkey;
    if (loginkey) {
      req.headers['x-login-key'] = loginkey;
      req.headers['X-Login-Key'] = loginkey;
      console.log("Middleware: set header x-login-key to", loginkey);
    }
    next();
  });

  // Proxy route for maps4
  app.use(
    '/maps',
    loggerMiddleware,
    createProxyMiddleware({
      target: maps4ServiceAddress,
      changeOrigin: true,
      pathRewrite: {
        '^/maps': '',
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log("onProxyRes status:", proxyRes.statusCode);
        console.log("onProxyRes headers:", proxyRes.headers);
      }
    } as any)
  );
}
