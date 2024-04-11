/* eslint-disable no-console */
import { connect, connection } from 'mongoose';

class MongoDBConnection {
  constructor() {
    if (!MongoDBConnection.instance) {
      connect(process.env.MONGODB_URI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
      MongoDBConnection.instance = this;
    }

    return MongoDBConnection.instance;
  }

  getConnection() {
    return connection;
  }
}

export default MongoDBConnection;
