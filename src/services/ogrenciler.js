import { DEFAULT_PAGINATION_VALUES } from '../constants/pagination.js';
import Ogrenciler from '../db/models/ogrenciler.js';
import { calculatePagination } from '../utils/calculatePagination.js';

const getOgrenciler = async (
  page = DEFAULT_PAGINATION_VALUES.page,
  perPage = DEFAULT_PAGINATION_VALUES.perPage,
  sortBy = DEFAULT_PAGINATION_VALUES.sortBy,
  sortOrder = DEFAULT_PAGINATION_VALUES.sortOrder,
  filter = {},
) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;
  const ogrenciQuery = Ogrenciler.find();

  if (filter.gender) {
    ogrenciQuery.where('gender').eq(filter.gender);
  }

  if (filter.minAge) {
    ogrenciQuery.where('age').gte(filter.minAge);
  }
  if (filter.maxAge) {
    ogrenciQuery.where('age').lte(filter.maxAge);
  }
  const totalData = await Ogrenciler.countDocuments(ogrenciQuery.getQuery());

  const data = await ogrenciQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const pagination = calculatePagination(totalData, page, perPage);

  return {
    data,
    pagination,
  };
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
