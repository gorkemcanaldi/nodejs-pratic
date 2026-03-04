import express from 'express';
import { dosyaOku, ogrenciEkle } from './utils/file.js';
import PinoHttp from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

const PORT = 5002;

app.use(cors());

// app.use('*', (req, res, next) => {}); tüm routelardaçalısır

/* app.use((error, req, res, next) => {
  console.log(error);
}); */
app.use(
  PinoHttp({
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
);

app.get('/', (req, res) => {
  res.send('AnaSayfa');
});

const ogrenci = {
  id: 4,
  isim: 'görkem',
  puan: 70,
  dil: 'tr',
};

app.use(express.json());

app.get('/ogrenciler', async (req, res) => {
  const data = await dosyaOku();
  res.json({
    message: 'öğrenci listesi',
    adet: data.length,
    durum: 'başarılı',
    durumKod: 200,
    data: data,
  });
});

app.post('/ogrenci-ekle', async (req, res) => {
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

app.listen(PORT, () => {
  console.log('server başlatıldı.');
});
