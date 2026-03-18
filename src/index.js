import initMongoDB from './db/initMongoDb.js';
import { createServer } from './server.js';
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {
  await initMongoDB();
  createServer();
};

main();

// blabla33 - teacher - 69bada824908a9de1defb951

// blabla34 - parent -  69badb10d6b8e7f0837d76e8
