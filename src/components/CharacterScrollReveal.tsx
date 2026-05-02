import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useResponsiveQuery } from '../hooks/mediaQuery'

// Spritesheet configuration (must match generate-spritesheets.mjs output)
const FRAME_COUNT = 140
const SHEET_COUNT = 10
const FRAMES_PER_SHEET = 14
const SPRITE_COLS = 2
const SPRITE_FRAME_W = 1536
const SPRITE_FRAME_H = 864
const BACKGROUND_COLOR = '#050505'

type CharacterScrollRevealProps = {
  characterName?: string
  id?: string
}

type StoryBeat = {
  start: number
  end: number
  title: string
  subtitle: string
}

const storyBeats: StoryBeat[] = [
  {
    start: 0,
    end: 0.2,
    title: 'CHARACTER NAME',
    subtitle: 'Fullstack Developer',
  },
  {
    start: 0.25,
    end: 0.45,
    title: 'BEYOND THE STACK',
    subtitle: 'Every layer crafted for seamless performance.',
  },
  {
    start: 0.5,
    end: 0.7,
    title: 'LOGIC MEETS ART',
    subtitle: 'Robust backends driving intuitive user experiences.',
  },
  {
    start: 0.75,
    end: 0.95,
    title: 'CODE WITH PURPOSE',
    subtitle: 'Scaling systems from the first byte to the final pixel.',
  },
]

const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max)

const mapRange = (
  value: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number,
) => {
  const progress = clamp((value - inputStart) / (inputEnd - inputStart))

  return outputStart + (outputEnd - outputStart) * progress
}

const getSequenceFrameIndex = (progress: number) => {
  const forwardIndex = Math.min(
    FRAME_COUNT - 1,
    Math.floor(progress * (FRAME_COUNT - 1)),
  )

  return FRAME_COUNT - 1 - forwardIndex
}

const getBeatStyle = (progress: number, beat: StoryBeat): CSSProperties => {
  const fadeDistance = 0.1
  let opacity = 0

  if (progress >= beat.start && progress <= beat.end) {
    if (progress < beat.start + fadeDistance) {
      opacity = mapRange(progress, beat.start, beat.start + fadeDistance, 0, 1)
    } else if (progress > beat.end - fadeDistance) {
      opacity = mapRange(progress, beat.end - fadeDistance, beat.end, 1, 0)
    } else {
      opacity = 1
    }
  }

  const y = progress < beat.start + (beat.end - beat.start) / 2
    ? mapRange(progress, beat.start, beat.start + fadeDistance, 20, 0)
    : mapRange(progress, beat.end - fadeDistance, beat.end, 0, -20)

  return {
    opacity,
    transform: `translate3d(0, ${y}px, 0)`,
    pointerEvents: opacity > 0.05 ? 'auto' : 'none',
  }
}

const CharacterScrollReveal = ({
  characterName = 'CHARACTER NAME',
  id,
}: CharacterScrollRevealProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sheetsRef = useRef<(HTMLImageElement | undefined)[]>([])
  const progressRef = useRef(0)
  const renderedFrameRef = useRef(-1)

  const [loadedSheets, setLoadedSheets] = useState(0)
  const [progress, setProgress] = useState(0)
  const { isMobile, isTablet, isLaptop } = useResponsiveQuery()
  const shouldCoverFrame = isMobile || isTablet

  const particles = useMemo(
    () => isMobile ? [] : Array.from({ length: 34 }, (_, index) => ({
      id: index,
      left: `${(index * 37) % 100}%`,
      top: `${(index * 53) % 100}%`,
      delay: `${(index % 9) * 0.42}s`,
      duration: `${7 + (index % 6)}s`,
      opacity: 0.12 + (index % 4) * 0.04,
    })),
    [isMobile],
  )

  const loadingProgress = Math.round((loadedSheets / SHEET_COUNT) * 100)
  const isLoaded = loadedSheets >= SHEET_COUNT

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    const stage = stickyRef.current

    if (!canvas || !stage) {
      return false
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return false
    }

    // Determine which spritesheet and position within it
    const sheetIndex = Math.floor(frameIndex / FRAMES_PER_SHEET)
    const localIndex = frameIndex % FRAMES_PER_SHEET
    const col = localIndex % SPRITE_COLS
    const row = Math.floor(localIndex / SPRITE_COLS)

    const sheet = sheetsRef.current[sheetIndex]

    if (!sheet?.naturalWidth) {
      return false
    }

    // Source rectangle on the spritesheet
    const sx = col * SPRITE_FRAME_W
    const sy = row * SPRITE_FRAME_H

    // Canvas sizing
    const width = stage.clientWidth
    const height = stage.clientHeight
    const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    const expectedWidth = Math.round(width * pixelRatio)
    const expectedHeight = Math.round(height * pixelRatio)

    if (canvas.width !== expectedWidth || canvas.height !== expectedHeight) {
      canvas.width = expectedWidth
      canvas.height = expectedHeight
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    context.clearRect(0, 0, width, height)
    context.fillStyle = BACKGROUND_COLOR
    context.fillRect(0, 0, width, height)

    // Scale frame to fit/cover the viewport
    const baseScale = shouldCoverFrame
      ? Math.max(width / SPRITE_FRAME_W, height / SPRITE_FRAME_H)
      : Math.min(width / SPRITE_FRAME_W, height / SPRITE_FRAME_H)
    const drawWidth = SPRITE_FRAME_W * baseScale
    const drawHeight = SPRITE_FRAME_H * baseScale
    const x = (width - drawWidth) / 2
    const y = (height - drawHeight) / 2

    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.drawImage(
      sheet,
      sx, sy, SPRITE_FRAME_W, SPRITE_FRAME_H,
      x, y, drawWidth, drawHeight,
    )

    return true
  }, [shouldCoverFrame])

  const renderProgress = useCallback((currentProgress: number) => {
    progressRef.current = currentProgress

    const frameIndex = getSequenceFrameIndex(currentProgress)

    if (frameIndex !== renderedFrameRef.current) {
      const didDraw = drawFrame(frameIndex)

      if (didDraw) {
        renderedFrameRef.current = frameIndex
      }
    }

    setProgress((current) => (
      Math.abs(current - currentProgress) > 0.001 ? currentProgress : current
    ))
  }, [drawFrame])

  // Load spritesheets (10 requests instead of 140)
  useEffect(() => {
    let cancelled = false
    sheetsRef.current = new Array(SHEET_COUNT)
    setLoadedSheets(0)

    Array.from({ length: SHEET_COUNT }, (_, sheetIndex) => {
      const image = new Image()

      image.decoding = 'async'
      image.src = `/spritesheets/sprite-${sheetIndex}.webp`
      image.onload = () => {
        if (cancelled) {
          return
        }

        sheetsRef.current[sheetIndex] = image
        setLoadedSheets((current) => Math.min(current + 1, SHEET_COUNT))

        // Re-draw current frame when a relevant sheet loads
        renderedFrameRef.current = -1
        renderProgress(progressRef.current)
      }
      image.onerror = () => {
        if (cancelled) {
          return
        }

        // Count as loaded even on error to avoid infinite loading
        setLoadedSheets((current) => Math.min(current + 1, SHEET_COUNT))
      }
    })

    return () => {
      cancelled = true
    }
  }, [renderProgress])

  useGSAP(() => {
    const wrapper = wrapperRef.current
    const stage = stickyRef.current

    if (!wrapper || !stage) {
      return undefined
    }

    const playhead = { progress: progressRef.current }

    gsap.to(playhead, {
      progress: 1,
      ease: 'none',
      onUpdate: () => {
        renderProgress(playhead.progress)
      },
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: isMobile ? '+=240%' : isTablet ? '+=300%' : '+=400%',
        scrub: true,
        pin: stage,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onLeave: () => {
          playhead.progress = 1
          renderedFrameRef.current = -1
          renderProgress(1)
        },
        onLeaveBack: () => {
          playhead.progress = 0
          renderedFrameRef.current = -1
          renderProgress(0)
        },
        onRefresh: () => {
          renderedFrameRef.current = -1
          renderProgress(playhead.progress)
        },
      },
    })

    const handleResize = () => {
      renderedFrameRef.current = -1
      renderProgress(progressRef.current)
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    renderProgress(progressRef.current)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, { scope: wrapperRef, dependencies: [isMobile, isTablet, renderProgress] })

  const stageClassName = `relative w-full overflow-hidden bg-[#050505] ${isMobile
    ? 'h-[100svh] min-h-[34rem]'
    : isTablet
      ? 'h-[100svh] min-h-[40rem]'
      : 'h-screen'
    }`

  const storyOverlayClassName = `pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-center ${isMobile
    ? 'h-[100svh] min-h-[34rem] px-4'
    : isTablet
      ? 'h-[100svh] min-h-[40rem] px-8'
      : 'h-screen px-8'
    }`

  const titleClassName = `text-balance font-headline font-black uppercase tracking-normal text-white/95 ${isMobile
    ? 'max-w-[21rem] text-[clamp(3.25rem,17vw,5.5rem)] leading-[0.84]'
    : isTablet
      ? 'max-w-[42rem] text-[clamp(5rem,12vw,7rem)] leading-[0.82]'
      : isLaptop
        ? 'max-w-5xl text-8xl leading-[0.82]'
        : 'max-w-5xl text-9xl leading-[0.82]'
    }`

  const subtitleClassName = `mt-6 max-w-xl font-medium text-white/60 ${isMobile
    ? 'text-sm leading-6'
    : isTablet
      ? 'text-lg leading-7'
      : 'text-xl leading-8'
    }`

  return (
    <section
      id={id}
      ref={wrapperRef}
      className="relative bg-[#050505] text-white"
      aria-label="Cinematic character reveal"
    >
      <div
        ref={stickyRef}
        className={stageClassName}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-[#050505]"
          aria-label="Scroll-linked character animation sequence"
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_42%,rgba(0,0,0,0.46)_72%,rgba(0,0,0,0.9)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.88)_0%,rgba(5,5,5,0.18)_24%,rgba(5,5,5,0)_50%,rgba(5,5,5,0.18)_76%,rgba(5,5,5,0.88)_100%)]" />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <span
              key={particle.id}
              className="character-dust absolute h-px w-px rounded-full bg-white transform-gpu"
              style={{
                left: particle.left,
                top: particle.top,
                opacity: particle.opacity,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>

        <div className={storyOverlayClassName}>
          {storyBeats.map((beat, index) => (
            <article
              key={beat.title}
              className="absolute mx-auto flex w-full max-w-full flex-col items-center text-center"
              style={getBeatStyle(progress, beat)}
            >
              <h1 className={titleClassName}>
                {index === 0 ? characterName : beat.title}
              </h1>
              <p className={subtitleClassName}>
                {beat.subtitle}
              </p>
            </article>
          ))}
        </div>

        <div
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/55"
          style={{
            opacity: mapRange(progress, 0.1, 0, 0, 1),
            transform: `translate3d(-50%, ${mapRange(progress, 0, 0.1, 0, 12)}px, 0)`,
          }}
        >
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.36em]">
            Scroll to Reveal
          </span>
          <span className="h-12 w-px overflow-hidden bg-white/15">
            <span className="block h-5 w-px animate-[scrollPulse_1.8s_ease-in-out_infinite] bg-[#d7c48f]/80" />
          </span>
        </div>

        <div
          className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#050505] px-6 transition-opacity duration-700 ${isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
        >
          <div className="mb-8 h-10 w-10 animate-spin rounded-full border border-white/10 border-t-[#d7c48f]" />
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-white/55">
            Loading Sequence
          </p>
          <div className="h-px w-64 max-w-full overflow-hidden bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#a8a8a8] via-[#d7c48f] to-white transition-[width] duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-4 text-xs tabular-nums text-white/35">{loadingProgress}%</p>
        </div>
      </div>
    </section>
  )
}

export default CharacterScrollReveal
