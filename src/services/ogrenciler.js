import Ogrenciler from '../db/models/ogrenciler.js';

const getOgrenciler = async () => {
  const data = await Ogrenciler.find();
  return data;
};

const getOgrenci = async (id) => {
  const data = await Ogrenciler.findById(id);
  return data;
};

const ogrenciOlustur = async (ogrenci) => {
  const data = await Ogrenciler.create(ogrenci);
  return data;
};

const ogrenciSil = async (ogrenciId) => {
  //  const silinenOgrenci = await Ogrenciler.findByIdAndDelete(id);
  const silinenOgrenci = await Ogrenciler.findOneAndDelete({ _id: ogrenciId });
  console.log(silinenOgrenci);
  return silinenOgrenci;
};

const ogrenciGuncelle = async (id, data, opt = {}) => {
  const sonuc = await Ogrenciler.findOneAndUpdate({ _id: id }, data, {
    new: true,
    includeResultMetadata: true,
    ...opt,
  });
  if (sonuc.value) {
    return {
      ogrenci: sonuc.value,
      yenimi: Boolean(sonuc.lastErrorObject.upserted),
    };
  }
  return null;
};

export {
  getOgrenciler,
  getOgrenci,
  ogrenciOlustur,
  ogrenciSil,
  ogrenciGuncelle,
};
