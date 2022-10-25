import Database from '../db';
import middleWares from '../middlewares';
import router from '../routes';
import Server from '../server';

const DB_NAME: string = process.env.DB_NAME || 'avantioTest';
const db = new Database({ dbName: DB_NAME });
db.connect();

const PORT: number = Number(process.env.PORT) || 3000;

const server = new Server({
  port: PORT,
  middleWares: middleWares,
  routes: [router],
});
server.listen();
