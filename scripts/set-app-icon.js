import fs from 'fs';
import path from 'path';

const logoPath = path.resolve('public/logo.png');

if (!fs.existsSync(logoPath)) {
  console.error('Logo not found at public/logo.png');
  process.exit(1);
}

const resDir = path.resolve('android/app/src/main/res');

if (!fs.existsSync(resDir)) {
  console.log('Android res directory not found yet.');
  process.exit(0);
}

const mipmapDirs = [
  'mipmap-mdpi',
  'mipmap-hdpi',
  'mipmap-xhdpi',
  'mipmap-xxhdpi',
  'mipmap-xxxhdpi'
];

const iconNames = [
  'ic_launcher.png',
  'ic_launcher_round.png',
  'ic_launcher_foreground.png'
];

mipmapDirs.forEach((dir) => {
  const targetDir = path.join(resDir, dir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  iconNames.forEach((icon) => {
    const dest = path.join(targetDir, icon);
    fs.copyFileSync(logoPath, dest);
    console.log(`Updated App launcher icon: ${dest}`);
  });
});

console.log('Successfully configured HDFC Bank logo as Android app launcher icon!');
