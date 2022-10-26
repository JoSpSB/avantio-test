import mongoose from 'mongoose';

interface DatabaseConfiguration {
  uri?: string;
  port?: number;
  dbName: string;
}

class Database {
  private _uri?: string;
  private _port?: number;
  private _dbName: string;

  constructor(databaseConfig: DatabaseConfiguration) {
    this._uri = databaseConfig.uri || 'mongodb://127.0.0.1';
    this._port = databaseConfig.port || 27017;
    this._dbName = databaseConfig.dbName;
  }

  public connect(): Promise<typeof mongoose> {
    return mongoose.connect(`${this._uri}:${this._port}/${this._dbName}`, { autoCreate: true });
  }

  public async dropCollection(collection: string, cb: CallableFunction) {
    mongoose.connection.dropCollection(collection, () => {
      cb();
    });
  }

  public close(): Promise<void> {
    return mongoose.disconnect();
  }
}

export default Database;
