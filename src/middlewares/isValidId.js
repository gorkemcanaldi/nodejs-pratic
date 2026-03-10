import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  if (!isValidObjectId(req.params.ogrenciId)) {
    throw createHttpError(400, 'yanlıs ogrenci id');
  }
  next();
};
