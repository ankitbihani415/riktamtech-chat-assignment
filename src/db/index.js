/* eslint-disable no-console */
import { connect, connection } from 'mongoose';
import { adminSeed, clearTestDB, userSeed } from '../seed/user.seeder';

export async function connectDB() {
  await connect(process.env.MONGODB_URI); //Connecting to the database
  await adminSeed();
}

export async function disconnectDB() {
  if (process.env.NODE_ENV === 'test') {
    await clearTestDB();
  }
  await connection.close(); // Closing the database connection
}

export async function testDB() {
  await connect(process.env.MONGODB_URI);
  await adminSeed();
  await userSeed();
}