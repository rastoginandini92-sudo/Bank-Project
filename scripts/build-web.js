import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('===> Compiling Web Admin Portal for production...');
execSync('npm run build --workspace=@bank/web', { cwd: rootDir, stdio: 'inherit' });

const webDist = path.join(rootDir, 'apps', 'web', 'dist');
const mobileDist = path.join(rootDir, 'apps', 'mobile', 'dist');

if (fs.existsSync(webDist)) {
  fs.cpSync(webDist, mobileDist, { recursive: true, force: true });
  console.log('===> ✅ Successfully copied Web Admin Portal to apps/mobile/dist for Vercel/Web hosting!');
}
