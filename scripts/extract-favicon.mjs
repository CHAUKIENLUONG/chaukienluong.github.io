import sharp from 'sharp'
import { resolve } from 'node:path'

// Extract frame 140 (last frame, index 139) from sprite-9.webp as favicon
// Frame 139 is in sheet 9 (index 9), localIndex = 139 % 14 = 13
// col = 13 % 2 = 1, row = Math.floor(13 / 2) = 6
const FRAME_W = 1536
const FRAME_H = 864
const col = 1
const row = 6

const input = resolve('public/spritesheets/sprite-9.webp')
const output = resolve('public/favicon.webp')

sharp(input)
  .extract({ left: col * FRAME_W, top: row * FRAME_H, width: FRAME_W, height: FRAME_H })
  .resize(180, 180, { fit: 'cover', position: 'top' })
  .webp({ quality: 85 })
  .toFile(output)
  .then(() => console.log('Favicon created:', output))
  .catch(err => console.error(err))
