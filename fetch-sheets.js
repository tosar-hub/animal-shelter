const fs = require('fs');
const path = require('path');
//https://docs.google.com/spreadsheets/d/1VyXoAIYIZgWAMa5taYN8cQhuGfuHHcdtX6gQXSjQjCA/edit?usp=sharing
// ЗАМЕНИТЕ ЭТОТ ID НА ID ВАШЕЙ ТАБЛИЦЫ
const SPREADSHEET_ID = '1VyXoAIYIZgWAMa5taYN8cQhuGfuHHcdtX6gQXSjQjCA'; 
const SHEET_NAME = 'Animals';

async function fetchAnimals() {
  // Публичный CSV экспорт Google Sheets
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
  
  const response = await fetch(url);
  const csvText = await response.text();
  
  // Простой парсинг CSV (без сторонних библиотек)
  const rows = csvText.split('\n').map(row => row.split(','));
  const headers = rows[0].map(h => h.replace(/^"|"$/g, '').trim());
  
  const animals = rows.slice(1).map(row => {
    let obj = {};
    headers.forEach((h, idx) => {
      let val = row[idx] ? row[idx].replace(/^"|"$/g, '').trim() : '';
      if (h === 'id') val = parseInt(val, 10);
      if (h === 'age_months') val = parseInt(val, 10);
      if (h === 'is_active') val = (val.toUpperCase() === 'TRUE');
      obj[h] = val;
    });
    return obj;
  }).filter(a => a.is_active === true); // только активные
  
  // Сохраняем в _data/animals.json
  const dataDir = path.join(__dirname, '_data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  fs.writeFileSync(path.join(dataDir, 'animals.json'), JSON.stringify(animals, null, 2));
  console.log(`✅ Загружено ${animals.length} животных из таблицы`);
}

fetchAnimals().catch(console.error);