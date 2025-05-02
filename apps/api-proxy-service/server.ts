import { App } from './src/app';
import { configureProxies } from './src/middlewares/proxy';
import "dotenv/config";

const port = process.env.API_PROXY_SERVICE_PORT || '3333';

const appInstance = new App();

configureProxies(appInstance.server);

const server = appInstance.server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

server.on('error', console.error);
