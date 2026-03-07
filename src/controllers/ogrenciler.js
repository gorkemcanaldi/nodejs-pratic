import createHttpError from 'http-errors';
import {
  getOgrenci,
  getOgrenciler,
  ogrenciGuncelle,
  ogrenciOlustur,
  ogrenciSil,
} from '../services/ogrenciler.js';

const getOgrenciListController = async (req, res) => {
  const data = await getOgrenciler();
  res.status(200).send({
    message: 'tüm öğrencilerin listesi',
    length: data.length,
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

const ogrenciOlusturController = async (req, res) => {
  const gelenData = req.body;
  const data = await ogrenciOlustur(gelenData);

  res.status(201).send({
    message: 'ogrenci olusturuldu',
    data: data,
  });
};

const ogrenciSilController = async (req, res) => {
  const { ogrenciId } = req.params;
  const data = await ogrenciSil(ogrenciId);

  res.status(200).send({
    message: 'ogrenci silindi',
    data: data,
  });
};

const ogrenciOlusturGuncelleController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const ogrenciData = req.body;

  const guncelleData = await ogrenciGuncelle(ogrenciId, ogrenciData, {
    upsert: true,
  });
  if (!guncelleData) {
    throw createHttpError({
      message: 'hata olustu',
    });
  }

  const durum = guncelleData.yenimi ? 201 : 200;
  const message = guncelleData.yenimi
    ? 'ogrenci olusturuldu'
    : 'ogrenci guncellendi';

  res.status(durum).send({
    message: message,
    data: ogrenciData,
  });
};

const ogrenciGuncelleController = async (req, res) => {
  const ogrenciId = req.params.ogrenciId;
  const ogrenciData = req.body;

  const guncelleData = await ogrenciGuncelle(ogrenciId, ogrenciData, {
    upsert: false,
  });
  if (!guncelleData) {
    throw createHttpError({
      message: 'hata olustu',
    });
  }

  res.status(200).send({
    message: 'ogrenci guncellendi',
    data: ogrenciData,
  });
};

export {
  getOgrenciListController,
  getOgrenciController,
  ogrenciOlusturController,
  ogrenciSilController,
  ogrenciOlusturGuncelleController,
  ogrenciGuncelleController,
};
