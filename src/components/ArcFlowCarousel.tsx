import { gsap } from 'gsap'
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'

export interface ArcFlowCarouselItem {
  src: string
  alt: string
  label: string
  title: string
  description: string
}

interface ArcFlowCarouselProps {
  items: ArcFlowCarouselItem[]
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {}
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      mediaQuery.addEventListener('change', callback)
      return () => mediaQuery.removeEventListener('change', callback)
    },
    () => typeof window === 'undefined' ? false : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  )
}

const DRAG_SMOOTHING = 14
const VELOCITY_WINDOW = 90
const MAX_FLICK = 9
const STAGGER_LAG_STRENGTH = 0.72
const MIN_FOLLOW_FRACTION = 0.55
const EDGE_FADE_FRACTION = 0.18

export default function ArcFlowCarousel({ items }: ArcFlowCarouselProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const innerRefs = useRef<(HTMLDivElement | null)[]>([])
  const reduceMotion = usePrefersReducedMotion()
  const [slotCount, setSlotCount] = useState(() => Math.max(items.length, 12))
  const layoutRef = useRef({
    radius: 900,
    cardWidth: 240,
    cardHeight: 350,
    step: 0.2,
    centerX: 0,
    centerY: 0,
    maxAngle: 0.8,
  })
  const currentRef = useRef(0)
  const targetRef = useRef(0)
  const slotOffsetsRef = useRef<number[]>([])
  const draggingRef = useRef(false)
  const pointerIdRef = useRef<number | null>(null)
  const lastXRef = useRef(0)
  const samplesRef = useRef<{ t: number; value: number }[]>([])
  const revealRef = useRef(reduceMotion ? 1 : 0)
  const revealStartRef = useRef(0)
  const total = items.length

  const measure = useCallback(() => {
    const stage = stageRef.current
    if (!stage || !total) return

    const width = stage.offsetWidth
    const height = stage.offsetHeight
    const cardWidth = width < 768
      ? gsap.utils.clamp(155, 210, width * 0.42)
      : gsap.utils.clamp(220, 300, width * 0.19)
    const cardAspect = 0.68
    const cardHeight = cardWidth / cardAspect
    const radius = width < 768
      ? Math.max(width * 0.95, cardWidth * 2.5)
      : Math.max(width * 1.08, cardWidth * 4.2)
    const step = (cardWidth * (width < 768 ? 0.65 : 1.02)) / radius
    const centerX = width / 2
    const centerY = height * 0.4 + radius
    const reach = Math.min(1, (width / 2 + cardWidth * 0.45) / radius)
    const maxAngle = Math.min(
      Math.asin(reach) + 0.08,
      step * Math.max(0.1, total / 2 - EDGE_FADE_FRACTION * 0.8),
    )

    layoutRef.current = { radius, cardWidth, cardHeight, step, centerX, centerY, maxAngle }

    const disc = discRef.current
    if (disc) {
      const discRadius = radius - cardHeight * 0.66
      disc.style.width = `${discRadius * 2}px`
      disc.style.height = `${discRadius * 2}px`
      disc.style.left = `${centerX}px`
      disc.style.top = `${centerY - discRadius}px`
    }

    const edgeFade = step * EDGE_FADE_FRACTION
    const needed = Math.ceil(((maxAngle + edgeFade) * 2) / step) + 2
    const next = Math.max(total, Math.ceil(needed / total) * total)
    setSlotCount((current) => current === next ? current : next)
  }, [total])

  useLayoutEffect(() => {
    measure()
    const stage = stageRef.current
    if (!stage) return

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [measure])

  useEffect(() => {
    if (!total) return
    if (reduceMotion) revealRef.current = 1

    const draw = (dt: number) => {
      const { radius, cardWidth, cardHeight, step, centerX, centerY, maxAngle } = layoutRef.current
      const span = slotCount * step
      const half = span / 2
      const edgeFade = step * EDGE_FADE_FRACTION
      const visibleAngle = maxAngle + edgeFade
      const slotOffsets = slotOffsetsRef.current

      if (slotOffsets.length !== slotCount) {
        slotOffsets.length = slotCount
        slotOffsets.fill(currentRef.current)
      }

      for (let i = 0; i < slotCount; i += 1) {
        const card = cardRefs.current[i]
        if (!card) continue

        if (reduceMotion) {
          slotOffsets[i] = currentRef.current
        } else {
          let rankAngle = (i * step - slotOffsets[i]) % span
          if (rankAngle < -half) rankAngle += span
          else if (rankAngle >= half) rankAngle -= span
          const distanceFactor = gsap.utils.clamp(0, 1, Math.abs(rankAngle) / maxAngle)
          const followRate = Math.max(
            (draggingRef.current ? DRAG_SMOOTHING : 5.5) * (1 - distanceFactor * STAGGER_LAG_STRENGTH),
            (draggingRef.current ? DRAG_SMOOTHING : 5.5) * MIN_FOLLOW_FRACTION,
          )
          const followLerp = 1 - Math.exp(-followRate * dt)
          slotOffsets[i] += (currentRef.current - slotOffsets[i]) * followLerp
        }

        let angle = (i * step - slotOffsets[i]) % span
        if (angle < -half) angle += span
        else if (angle >= half) angle -= span

        const absoluteAngle = Math.abs(angle)
        if (absoluteAngle > visibleAngle) {
          card.style.visibility = 'hidden'
          continue
        }
        card.style.visibility = 'visible'
        const fadeProgress = gsap.utils.clamp(0, 1, (absoluteAngle - (maxAngle - edgeFade)) / (edgeFade * 2))
        const edgeOpacity = 1 - fadeProgress * fadeProgress * (3 - 2 * fadeProgress)
        card.style.opacity = `${Math.max(0.12, edgeOpacity)}`

        const x = centerX + radius * Math.sin(angle) - cardWidth / 2
        const y = centerY - radius * Math.cos(angle) - cardHeight / 2
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`
        card.style.width = `${cardWidth}px`
        card.style.height = `${cardHeight}px`
        card.style.zIndex = `${Math.round((angle + half) * 1000)}`

        const inner = innerRefs.current[i]
        if (inner && revealRef.current < 1) {
          const delay = Math.min(1, Math.abs(angle) / maxAngle) * 0.4
          const progress = gsap.utils.clamp(0, 1, (revealRef.current - delay) / (1 - delay || 1))
          const eased = 1 - Math.pow(1 - progress, 3)
          inner.style.opacity = `${eased}`
          inner.style.transform = `translate3d(0, ${(1 - eased) * cardHeight * 0.25}px, 0)`
        } else if (inner) {
          inner.style.opacity = '1'
          inner.style.transform = 'translate3d(0, 0, 0)'
        }
      }
    }

    const tick = (_time: number, deltaTime: number) => {
      const dt = Math.min(deltaTime, 50) / 1000
      const rate = draggingRef.current ? DRAG_SMOOTHING : 5.5
      const lerp = 1 - Math.exp(-rate * dt)
      const delta = targetRef.current - currentRef.current
      currentRef.current += delta * lerp
      if (Math.abs(delta) < 0.00002) currentRef.current = targetRef.current

      if (!reduceMotion && revealRef.current < 1) {
        const now = performance.now()
        if (!revealStartRef.current) revealStartRef.current = now
        revealRef.current = Math.min(1, (now - revealStartRef.current) / 1000)
      }

      if (!reduceMotion && !draggingRef.current) {
        targetRef.current += 0.04 * dt
      }
      draw(dt)
    }

    draw(0)
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [reduceMotion, slotCount, total])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !total) return

    const pushSample = () => {
      const now = performance.now()
      const samples = samplesRef.current
      samples.push({ t: now, value: targetRef.current })
      while (samples.length > 2 && now - samples[0].t > VELOCITY_WINDOW) samples.shift()
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 && event.pointerType === 'mouse') return
      draggingRef.current = true
      pointerIdRef.current = event.pointerId
      lastXRef.current = event.clientX
      samplesRef.current = [{ t: performance.now(), value: targetRef.current }]
      targetRef.current = currentRef.current
      stage.setPointerCapture(event.pointerId)
      stage.style.cursor = 'grabbing'
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!draggingRef.current || event.pointerId !== pointerIdRef.current) return
      const deltaX = event.clientX - lastXRef.current
      lastXRef.current = event.clientX
      targetRef.current -= (deltaX * 1.15) / layoutRef.current.radius
      pushSample()
    }

    const endDrag = (event: PointerEvent) => {
      if (!draggingRef.current || event.pointerId !== pointerIdRef.current) return
      draggingRef.current = false
      pointerIdRef.current = null
      stage.style.cursor = 'grab'
      if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId)
      pushSample()

      if (!reduceMotion) {
        const samples = samplesRef.current
        const first = samples[0]
        const last = samples[samples.length - 1]
        const elapsed = first && last ? (last.t - first.t) / 1000 : 0
        if (elapsed > 0.008) {
          const velocity = (last.value - first.value) / elapsed
          const flick = gsap.utils.clamp(-MAX_FLICK, MAX_FLICK, velocity / 5.5)
          targetRef.current += flick
        }
      }
      samplesRef.current = []
    }

    const onWheel = (event: WheelEvent) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      if (!horizontal) return
      event.preventDefault()
      targetRef.current += (event.deltaX * 1.15) / layoutRef.current.radius
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const { step } = layoutRef.current
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        targetRef.current += step
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        targetRef.current -= step
      }
    }

    stage.addEventListener('pointerdown', onPointerDown)
    stage.addEventListener('pointermove', onPointerMove)
    stage.addEventListener('pointerup', endDrag)
    stage.addEventListener('pointercancel', endDrag)
    stage.addEventListener('wheel', onWheel, { passive: false })
    stage.addEventListener('keydown', onKeyDown)

    return () => {
      stage.removeEventListener('pointerdown', onPointerDown)
      stage.removeEventListener('pointermove', onPointerMove)
      stage.removeEventListener('pointerup', endDrag)
      stage.removeEventListener('pointercancel', endDrag)
      stage.removeEventListener('wheel', onWheel)
      stage.removeEventListener('keydown', onKeyDown)
    }
  }, [reduceMotion, total])

  if (!total) return null
  const slots = Array.from({ length: slotCount }, (_, index) => items[index % total])

  return (
    <div className="arc-flow-carousel" ref={stageRef} tabIndex={0} role="region" aria-label="Our project process. Drag or use arrow keys to explore." style={{ touchAction: 'pan-y' }}>
      <div
        ref={discRef}
        aria-hidden="true"
        className="arc-flow-carousel__disc"
      />
      {slots.map((item, index) => (
        <div
          key={index}
          ref={(element) => { cardRefs.current[index] = element }}
          className="arc-flow-carousel__card"
          style={{ visibility: 'hidden' }}
          aria-hidden={index >= total}
        >
          <div
            ref={(element) => { innerRefs.current[index] = element }}
            className="arc-flow-carousel__inner"
            style={{ opacity: reduceMotion ? 1 : 0 }}
          >
            <img src={item.src} alt={item.alt} draggable={false} />
            <div className="arc-flow-carousel__shade" />
            <span className="arc-flow-carousel__step">{item.label}</span>
            <div className="arc-flow-carousel__copy">
              <span className="arc-flow-carousel__rule" aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
