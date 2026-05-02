import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

// Current spritesheet specs (input)
const OLD_FRAME_W = 728
const OLD_FRAME_H = 408
const OLD_COLS = 2
const OLD_FRAMES_PER_SHEET = 14
const OLD_SHEET_COUNT = 10
const FRAME_COUNT = 140

// New spritesheet specs (output) — upscale to 1200x674 + sharpen
const NEW_FRAME_W = 1200
const NEW_FRAME_H = 674
const NEW_COLS = 2
const NEW_ROWS = 7
const NEW_FRAMES_PER_SHEET = 14
const WEBP_QUALITY = 86

const INPUT_DIR = resolve('public/spritesheets')
const OUTPUT_DIR = resolve('public/spritesheets-hd')

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true })

  // Step 1: Extract all frames from current spritesheets
  console.log('Extracting frames from current spritesheets...')
  const frames = []

  for (let i = 0; i < FRAME_COUNT; i++) {
    const sheetIndex = Math.floor(i / OLD_FRAMES_PER_SHEET)
    const localIndex = i % OLD_FRAMES_PER_SHEET
    const col = localIndex % OLD_COLS
    const row = Math.floor(localIndex / OLD_COLS)

    const sheetPath = join(INPUT_DIR, `sprite-${sheetIndex}.webp`)

    // Extract, upscale and sharpen each frame
    const frameBuffer = await sharp(sheetPath)
      .extract({
        left: col * OLD_FRAME_W,
        top: row * OLD_FRAME_H,
        width: OLD_FRAME_W,
        height: OLD_FRAME_H,
      })
      .resize(NEW_FRAME_W, NEW_FRAME_H, {
        kernel: sharp.kernel.lanczos3,
        fit: 'fill',
      })
      .sharpen({
        sigma: 0.8,
        m1: 0.7,
        m2: 0.5,
      })
      .toBuffer()

    frames.push(frameBuffer)
    process.stdout.write(`  Frame ${i + 1}/${FRAME_COUNT}\r`)
  }

  console.log('\nAll frames extracted and sharpened.')

  // Step 2: Compose new spritesheets
  const newSheetCount = Math.ceil(FRAME_COUNT / NEW_FRAMES_PER_SHEET)
  console.log(`\nGenerating ${newSheetCount} HD spritesheets...`)
  console.log(`Frame size: ${NEW_FRAME_W}x${NEW_FRAME_H}, Grid: ${NEW_COLS}x${NEW_ROWS}`)

  let totalSize = 0

  for (let sheetIndex = 0; sheetIndex < newSheetCount; sheetIndex++) {
    const startFrame = sheetIndex * NEW_FRAMES_PER_SHEET
    const endFrame = Math.min(startFrame + NEW_FRAMES_PER_SHEET, FRAME_COUNT)
    const framesInSheet = endFrame - startFrame

    const composites = []

    for (let i = 0; i < framesInSheet; i++) {
      const globalIndex = startFrame + i
      const col = i % NEW_COLS
      const row = Math.floor(i / NEW_COLS)

      composites.push({
        input: frames[globalIndex],
        left: col * NEW_FRAME_W,
        top: row * NEW_FRAME_H,
      })
    }

    const sheetWidth = NEW_COLS * NEW_FRAME_W
    const sheetHeight = NEW_ROWS * NEW_FRAME_H
    const outputPath = join(OUTPUT_DIR, `sprite-${sheetIndex}.webp`)

    await sharp({
      create: {
        width: sheetWidth,
        height: sheetHeight,
        channels: 3,
        background: { r: 5, g: 5, b: 5 },
      },
    })
      .composite(composites)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath)

    const stats = await import('node:fs').then(fs => fs.statSync(outputPath))
    totalSize += stats.size
    console.log(`  Sheet ${sheetIndex}: ${(stats.size / 1024).toFixed(0)} KB`)
  }

  console.log(`\n✓ Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

  if (totalSize > 4 * 1024 * 1024) {
    console.warn('⚠ WARNING: Total exceeds 4MB budget!')
  } else {
    console.log('✓ Within 4MB budget!')
  }

  console.log(`\nMetadata for component:`)
  console.log(JSON.stringify({
    frameWidth: NEW_FRAME_W,
    frameHeight: NEW_FRAME_H,
    cols: NEW_COLS,
    rows: NEW_ROWS,
    framesPerSheet: NEW_FRAMES_PER_SHEET,
    sheetCount: newSheetCount,
    totalFrames: FRAME_COUNT,
  }, null, 2))
}

main().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
