const fs = require('fs');
const path = require('path');

// ЗАМЕНИТЕ НА ID ВАШЕЙ ТАБЛИЦЫ
const SPREADSHEET_ID = '1ABC123...'; 
const SHEET_NAME = 'Animals';

async function fetchAnimals() {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
  
  const response = await fetch(url);
  const csvText = await response.text();
  
  // Простой парсинг CSV
  const rows = csvText.split('\n').map(row => row.split(','));
  const headers = rows[0].map(h => h.replace(/^"|"$/g, '').trim());
  
  const animals = rows.slice(1).map(row => {
    let obj = {};
    headers.forEach((h, idx) => {
      let val = row[idx] ? row[idx].replace(/^"|"$/g, '').trim() : '';
      if (h === 'id') val = parseInt(val, 10);
      if (h === 'age_months') val = parseInt(val, 10);
      if (h === 'is_active') val = (val.toUpperCase() === 'TRUE');
      // нормализация пола
      if (h === 'gender') {
        if (val === 'male' || val === 'm') val = 'male';
        else if (val === 'female' || val === 'f') val = 'female';
        else val = 'unknown';
      }
      obj[h] = val;
    });
    return obj;
  }).filter(a => a.is_active === true);
  
  const dataDir = path.join(__dirname, '_data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  fs.writeFileSync(path.join(dataDir, 'animals.json'), JSON.stringify(animals, null, 2));
  console.log(`✅ Загружено ${animals.length} животных`);
}

fetchAnimals().catch(console.error);