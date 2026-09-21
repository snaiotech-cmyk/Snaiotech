import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends Element = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback: force visible after 400ms so inputs are never permanently locked
    const fallback = setTimeout(() => setVisible(true), 400)

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          clearTimeout(fallback)
          obs.disconnect()
        }
      },
      { threshold, root: null }
    )
    obs.observe(el)
    return () => {
      clearTimeout(fallback)
      obs.disconnect()
    }
  }, [threshold])

  return { ref, visible }
}
