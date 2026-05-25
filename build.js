import { execSync } from 'child_process';
import { Eleventy } from '@11ty/eleventy';

async function build() {
  console.log('📡 Загрузка данных из Google Sheets...');
  execSync('node fetch-sheets.cjs', { stdio: 'inherit' });
  
  console.log('🏗️ Запуск Eleventy...');
  let elev = new Eleventy('.', '_site');
  let result = await elev.toJSON();
  
  console.log(`✅ Собрано ${result.length} страниц`);
}

build().catch(err => {
  console.error('Ошибка сборки:', err);
  process.exit(1);
});