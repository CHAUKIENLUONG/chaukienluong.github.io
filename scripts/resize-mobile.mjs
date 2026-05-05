import sharp from 'sharp';
import { readdir, rename } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const DIR = resolve('public/spritesheets');

async function main() {
  const files = await readdir(DIR);
  
  // First, find all current AVIF spritesheets
  const sprites = files.filter(f => f.startsWith('sprite-') && f.endsWith('.avif') && !f.includes('mobile') && !f.includes('desktop'));
  
  if (sprites.length === 0) {
    console.log('No original sprites found to process. Maybe they are already renamed?');
    return;
  }

  for (const file of sprites) {
    const inputPath = join(DIR, file);
    
    // We want to scale from 3072x6048 (1536x864 frames) to 1600x3150 (800x450 frames)
    const mobileOutputPath = join(DIR, file.replace('sprite-', 'sprite-mobile-'));
    
    console.log(`Processing ${file}...`);
    
    // Create Mobile version
    await sharp(inputPath)
      .resize(1600, 3150, { fit: 'fill' })
      .avif({ quality: 65, effort: 4 })
      .toFile(mobileOutputPath);
      
    // Rename original to desktop version
    const desktopOutputPath = join(DIR, file.replace('sprite-', 'sprite-desktop-'));
    await rename(inputPath, desktopOutputPath);
    
    console.log(` -> Created ${mobileOutputPath} & renamed original to ${desktopOutputPath}`);
  }
  
  console.log('Done!');
}

main().catch(console.error);
