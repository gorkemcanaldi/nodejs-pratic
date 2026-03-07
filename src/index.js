import initMongoDB from './db/initMongoDb.js';
import { createServer } from './server.js';
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  await initMongoDB();
  createServer();
};

main();
