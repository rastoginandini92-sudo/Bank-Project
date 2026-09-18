import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

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

const mipmapSizes = [
  { name: 'mipmap-mdpi', size: 48, padding: 8 },
  { name: 'mipmap-hdpi', size: 72, padding: 12 },
  { name: 'mipmap-xhdpi', size: 96, padding: 16 },
  { name: 'mipmap-xxhdpi', size: 144, padding: 24 },
  { name: 'mipmap-xxxhdpi', size: 192, padding: 32 }
];

const iconNames = [
  'ic_launcher.png',
  'ic_launcher_round.png',
  'ic_launcher_foreground.png'
];

async function generateUncroppedIcons() {
  for (const item of mipmapSizes) {
    const targetDir = path.join(resDir, item.name);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const innerSize = item.size - item.padding * 2;

    // Create a padded image with sharp to prevent Android circular mask cropping
    const paddedBuffer = await sharp(logoPath)
      .resize(innerSize, innerSize, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .extend({
        top: item.padding,
        bottom: item.padding,
        left: item.padding,
        right: item.padding,
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toBuffer();

    for (const icon of iconNames) {
      const dest = path.join(targetDir, icon);
      fs.writeFileSync(dest, paddedBuffer);
      console.log(`Generated padded uncropped icon: ${dest}`);
    }
  }

  console.log('Successfully generated padded uncropped HDFC Bank launcher icons!');
}

generateUncroppedIcons().catch((err) => {
  console.error('Error generating icons:', err);
});
