import Ogrenciler from '../db/models/ogrenciler.js';

const getOgrenciler = async () => {
  const data = await Ogrenciler.find();
  return data;
};

const getOgrenci = async (id) => {
  const data = await Ogrenciler.findById(id);
  return data;
};

export { getOgrenciler, getOgrenci };
