import createHttpError from 'http-errors';
import { USER_ROLES } from '../constants/index.js';
import { getOgrenci } from '../services/ogrenciler.js';

export const checkRoles =
  (...allowedRoles) =>
  async (req, res, next) => {
    const user = req.user;
    if (!user) {
      next(createHttpError(404, 'kullanıcı bulunamadı'));
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      next(createHttpError(401, 'Geçersiz role'));
      return;
    }

    if (user.role == USER_ROLES.PARENT) {
      const { ogrenciId } = req.params;
      const ogrenciData = await getOgrenci(ogrenciId);

      if (!ogrenciData) {
        next(createHttpError(404, 'ogrenci bulunamadı'));
        return;
      }

      if (ogrenciData.parentId.toString() !== user._id.toString()) {
        next(createHttpError(401, 'Hatalı ebeveyn'));
        return;
      }
    }
    next();
  };
