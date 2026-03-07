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

const ogrenciRouter = Router();

ogrenciRouter.get('/', controllerWrapper(getOgrenciListController));
ogrenciRouter.post('/', controllerWrapper(ogrenciOlusturController));
ogrenciRouter.delete('/:ogrenciId', controllerWrapper(ogrenciSilController));
ogrenciRouter.put(
  '/:ogrenciId',
  controllerWrapper(ogrenciOlusturGuncelleController),
);
ogrenciRouter.patch(
  '/:ogrenciId',
  controllerWrapper(ogrenciGuncelleController),
);

ogrenciRouter.get('/:ogrenciId', getOgrenciController);

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
