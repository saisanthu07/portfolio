import { useEffect, useRef, useState } from 'react'

/**
 * A custom React hook that triggers a fade-in effect when the referenced element
 * intersects with the viewport, using the Intersection Observer API.
 *
 * @param {number} [threshold=0.15] - The intersection ratio threshold to trigger visibility.
 * @returns {[React.RefObject, boolean]} An array containing the React ref and a boolean indicating visibility.
 */
export function useFadeIn(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}
