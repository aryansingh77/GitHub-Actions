const fs = require('fs');
const path = require('path');

function removeBomFromFile(filePath) {
  const data = fs.readFileSync(filePath);
  // check for UTF-8 BOM 0xEF,0xBB,0xBF
  if (data.length >= 3 && data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) {
    const newData = data.slice(3);
    fs.writeFileSync(filePath, newData);
    console.log('Removed BOM:', filePath);
    return true;
  }
  return false;
}

function walk(dir, exts) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full, exts);
    } else if (exts.includes(path.extname(f))) {
      try {
        removeBomFromFile(full);
      } catch (e) {
        console.error('Error processing', full, e.message);
      }
    }
  }
}

const targets = ['src', 'tests'];
const exts = ['.js', '.jsx', '.ts', '.tsx', '.json', '.md'];
for (const t of targets) {
  const p = path.join(__dirname, '..', t);
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) walk(p, exts);
}

console.log('BOM cleanup complete');
