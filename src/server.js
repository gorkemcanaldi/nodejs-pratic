import express from 'express';
// import PinoHttp from 'pino-http';
import cors from 'cors';
import ogrenciRouter from './routers/ogrenciler.js';
import { notPageHandler } from './middlewares/notPageHandler.js';
import { errorHandler } from './middlewares/ErrorHnadler.js';

export const createServer = () => {
  const PORT = process.env.PORT;
  const app = express();

  app.use(cors());

  // app.use('*', (req, res, next) => {}); tüm routelardaçalısır

  /* app.use((error, req, res, next) => {
  console.log(error);
}); */
  /*  app.use(
    PinoHttp({
      transport: {
        target: 'pino-pretty',
        options: { colorize: true },
      },
    }),
  ); */

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('AnaSayfa');
  });

  app.use('/ogrenciler', ogrenciRouter);

  app.use(notPageHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log('server başlatıldı.');
  });
};
