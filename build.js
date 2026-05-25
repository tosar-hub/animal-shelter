import { execSync } from 'child_process';
import { Eleventy } from '@11ty/eleventy';

async function build() {
  // 1. Загружаем данные из Google Sheets
  console.log('📡 Загрузка данных из Google Sheets...');
  execSync('node fetch-sheets.js', { stdio: 'inherit' });
  
  // 2. Запускаем Eleventy программно
  console.log('🏗️ Запуск Eleventy...');
  let elev = new Eleventy('.', '_site');
  let result = await elev.toJSON();
  
  console.log(`✅ Собрано ${result.length} страниц`);
}

build().catch(err => {
  console.error('Ошибка сборки:', err);
  process.exit(1);
});