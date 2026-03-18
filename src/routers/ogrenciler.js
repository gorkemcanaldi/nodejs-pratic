// import { dosyaOku, ogrenciEkle } from '../utils/file.js';
import { Router } from 'express';
import {
  getOgrenciController,
  getOgrenciListController,
  ogrenciOlusturController,
  ogrenciGuncelleController,
  ogrenciOlusturGuncelleController,
  ogrenciSilController,
} from '../controllers/ogrenciler.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validatorBody.js';
import {
  ogrenciEkleSchema,
  ogrenciGuncelleSchema,
} from '../validators/ogrenciler.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authorization } from '../middlewares/authorization.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { USER_ROLES } from '../constants/index.js';

const ogrenciRouter = Router();
ogrenciRouter.use(authorization);

ogrenciRouter.get(
  '/',
  checkRoles(USER_ROLES.TEACHER),
  controllerWrapper(getOgrenciListController),
);
ogrenciRouter.get(
  '/:ogrenciId',
  checkRoles(USER_ROLES.PARENT),
  isValidId,
  getOgrenciController,
);

ogrenciRouter.post(
  '/',
  checkRoles(USER_ROLES.TEACHER),
  validateBody(ogrenciEkleSchema),
  controllerWrapper(ogrenciOlusturController),
);
ogrenciRouter.delete(
  '/:ogrenciId',
  isValidId,
  controllerWrapper(ogrenciSilController),
);
ogrenciRouter.put(
  '/:ogrenciId',
  controllerWrapper(ogrenciOlusturGuncelleController),
);
ogrenciRouter.patch(
  '/:ogrenciId',
  isValidId,
  validateBody(ogrenciGuncelleSchema),
  controllerWrapper(ogrenciGuncelleController),
);

export default ogrenciRouter;

/*              MODUL 1 DE YAPILAN DOSYA OKUMA İLE YAPILAN ROTLAR
ogrenciRouter.get('/ogrenciler', async (req, res) => {
  const data = await dosyaOku();
  res.json({
    message: 'öğrenci listesi',
    adet: data.length,
    durum: 'başarılı',
    durumKod: 200,
    data: data,
  });
});

ogrenciRouter.post('/ogrenci-ekle', async (req, res) => {
  const gelenData = req.body;
  const tumData = await dosyaOku();
  tumData.push(gelenData);
  await ogrenciEkle(tumData);
  res.json({
    message: 'oğrenci başarıyla kaydedildi',
    durum: 'baarılı',
    durumKod: 201,
    data: gelenData,
  });
});


*/
