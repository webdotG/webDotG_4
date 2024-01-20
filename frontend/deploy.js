import fs from 'fs';
import path from 'path';

// Получение пути к каталогу текущего файла
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Получение пути к папке dist внутри папки CLIENT
// const distPath = path.resolve(__dirname, 'CLIENT', 'dist');
// const distPath = path.join(__dirname, '..', 'dist');
const distPath = path.join(__dirname, 'dist');

// // Получение пути к папке CLIENT
// const clientPath = path.resolve(__dirname, '..', 'CLIENT');

// // Путь к папке dist внутри CLIENT
// const distPath = path.join(clientPath, 'dist');

// Создание каталога dist, если он не существует
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Необходимый адрес для CNAME
const cnameContent = 'www.webdotg.ru'; // Замените на нужный адрес

// Путь к файлу CNAME в папке dist
const cnameFilePath = path.join(distPath, 'CNAME');

// Создание файла CNAME
fs.writeFileSync(cnameFilePath, cnameContent);
