import express, { Application, Router, RequestHandler } from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';

interface ServerConfiguration {
  port?: number;
  middleWares?: RequestHandler[];
  routes?: Router[];
}

/**
 * Server to expose the API.
 */
class Server {
  private _app: Application;
  private _port: number;
  private _server?: http.Server;

  constructor(serverConf: ServerConfiguration) {
    this._app = express();
    this._app.use(bodyParser.json());
    this._port = serverConf.port || 3000;

    if (serverConf.middleWares) {
      this._middlewares(serverConf.middleWares);
    }

    if (serverConf.routes) {
      this._routes(serverConf.routes);
    }
  }

  /**
   * Use configured middlewares.
   * @param middleWares 
   */
  private _middlewares(middleWares: RequestHandler[]) {
    middleWares.forEach((middleWare) => this._app.use(middleWare));
  }

  /**
   * Use defined routes.
   * @param routes 
   */
  private _routes(routes: Router[]) {
    routes.forEach((route) => this._app.use(route));
  }

  /**
   * Start the server listening on specific port.
   */
  public listen() {
    this._server = http.createServer(this._app);
    this._server.listen(this._port, () => {
      console.log(`App listening on port ${this._port}`);
    });
  }
}

export default Server;
