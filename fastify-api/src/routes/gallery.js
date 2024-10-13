import fs from 'node:fs';

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}
