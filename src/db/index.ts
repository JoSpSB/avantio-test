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

  public connect() {
    mongoose.connect(`${this._uri}:${this._port}/${this._dbName}`, { autoCreate: true });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
      console.log('Database connected successfully!');
    });
  }
}

export default Database;
