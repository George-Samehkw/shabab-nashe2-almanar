const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const publishDir = path.join(projectRoot, 'dist');

fs.rmSync(publishDir, { recursive: true, force: true });
fs.mkdirSync(publishDir, { recursive: true });
fs.copyFileSync(path.join(projectRoot, 'index.html'), path.join(publishDir, 'index.html'));

const assetsDir = path.join(projectRoot, 'assets');
if (fs.existsSync(assetsDir)) {
  fs.cpSync(assetsDir, path.join(publishDir, 'assets'), { recursive: true });
}

console.log('Prepared the self-contained site for Netlify in dist/.');
