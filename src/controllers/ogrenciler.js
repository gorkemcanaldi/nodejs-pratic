import createHttpError from 'http-errors';
import { getOgrenci, getOgrenciler } from '../services/ogrenciler.js';

const getOgrenciListController = async (req, res) => {
  const data = await getOgrenciler();
  res.status(200).send({
    message: 'tüm öğrencilerin listesi',
    data: data,
  });
};

const getOgrenciController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const data = await getOgrenci(ogrenciId);
  if (!data) {
    throw createHttpError({
      message: 'ogrenci bulunamadı',
      status: 404,
    });
  }

  res.status(200).send({
    message: 'ogrenci datası',
    data: data,
  });
};

export { getOgrenciListController, getOgrenciController };
