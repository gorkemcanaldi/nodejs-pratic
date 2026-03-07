import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).send({
      message: err.message,
      status: err.status,
    });
  }

  res.status(500).send({
    message: 'sunucu hatası',
    durum: 500,
  });
};
