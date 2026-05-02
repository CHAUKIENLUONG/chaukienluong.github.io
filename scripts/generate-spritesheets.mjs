import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const FRAME_COUNT = 140
const FRAMES_PER_SHEET = 14
const COLS = 2
const ROWS = 7
// Scale down to 60% of original (2560x1440 -> 1536x864) for much higher quality
const FRAME_W = 1536
const FRAME_H = 864
const WEBP_QUALITY = 80

const SOURCE_DIR = resolve('public/sequence')
const OUTPUT_DIR = resolve('public/spritesheets')
const SHEET_COUNT = Math.ceil(FRAME_COUNT / FRAMES_PER_SHEET)

async function main() {
  // Ensure output directory exists
  await mkdir(OUTPUT_DIR, { recursive: true })

  // Read and sort source frames
  const allFiles = await readdir(SOURCE_DIR)
  const frameFiles = allFiles
    .filter(f => f.startsWith('ezgif-frame-') && f.endsWith('.webp'))
    .sort()

  if (frameFiles.length !== FRAME_COUNT) {
    console.error(`Expected ${FRAME_COUNT} frames but found ${frameFiles.length}`)
    process.exit(1)
  }

  console.log(`Found ${frameFiles.length} frames. Generating ${SHEET_COUNT} spritesheets...`)
  console.log(`Frame size: ${FRAME_W}x${FRAME_H}, Grid: ${COLS}x${ROWS}, Sheet size: ${COLS * FRAME_W}x${ROWS * FRAME_H}`)

  let totalSize = 0

  for (let sheetIndex = 0; sheetIndex < SHEET_COUNT; sheetIndex++) {
    const startFrame = sheetIndex * FRAMES_PER_SHEET
    const endFrame = Math.min(startFrame + FRAMES_PER_SHEET, FRAME_COUNT)
    const framesInSheet = endFrame - startFrame

    console.log(`\nSheet ${sheetIndex}: frames ${startFrame}-${endFrame - 1} (${framesInSheet} frames)`)

    // Prepare composite operations
    const composites = []

    for (let i = 0; i < framesInSheet; i++) {
      const globalIndex = startFrame + i
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const framePath = join(SOURCE_DIR, frameFiles[globalIndex])

      // Resize each frame to target size
      const resizedBuffer = await sharp(framePath)
        .resize(FRAME_W, FRAME_H, { fit: 'cover' })
        .toBuffer()

      composites.push({
        input: resizedBuffer,
        left: col * FRAME_W,
        top: row * FRAME_H,
      })

      process.stdout.write(`  Frame ${globalIndex + 1}/${FRAME_COUNT}\r`)
    }

    // Create the spritesheet canvas and composite all frames
    const sheetWidth = COLS * FRAME_W
    const sheetHeight = ROWS * FRAME_H

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
    console.log(`  -> ${outputPath} (${(stats.size / 1024).toFixed(0)} KB)`)
  }

  console.log(`\n✓ All spritesheets generated successfully! Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

  // Generate metadata JSON for the component
  const metadata = {
    frameWidth: FRAME_W,
    frameHeight: FRAME_H,
    cols: COLS,
    rows: ROWS,
    framesPerSheet: FRAMES_PER_SHEET,
    sheetCount: SHEET_COUNT,
    totalFrames: FRAME_COUNT,
  }

  console.log('\nSpritesheet metadata:')
  console.log(JSON.stringify(metadata, null, 2))
}

main().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
