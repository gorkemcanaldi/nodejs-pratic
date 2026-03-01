// import path from 'node:path';
// const s = path.resolve(); dosya yolunu verir C:\Users\gorkemcanaldi\Desktop\nodejs

import fs from 'node:fs/promises';

// const data2 = await fs.readFile('data.txt');
// console.log(data2);

// await fs.rename('data.txt', 'yeni-bilgi.txt');

// const dosyalar = await fs.readdir('./');
// console.log(dosyalar);

const DATABASE = 'src/data/data.json';

async function dosyaOku() {
  try {
    const data = await fs.readFile(DATABASE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

dosyaOku();

async function ogrenciEkle(yeniogrenci) {
  try {
    await fs.writeFile(DATABASE, JSON.stringify(yeniogrenci, null, 2));
  } catch (error) {
    console.log(error);
  }
}

const yeniOgrenciData = {
  id: 2,
  isim: 'mehmet',
  puan: 50,
  ders: 'fizik',
};

async function main() {
  const tümOgrenciler = await dosyaOku();
  tümOgrenciler.push(yeniOgrenciData);
  await ogrenciEkle(tümOgrenciler);
}

main();
