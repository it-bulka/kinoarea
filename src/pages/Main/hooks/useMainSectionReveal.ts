import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

interface SectionRevealOptions {
  aboveFold?: boolean
  deps?: unknown[]
  start?: string
}

export const useMainSectionReveal = <T extends HTMLElement = HTMLElement>(options: SectionRevealOptions = {}) => {
  const { aboveFold = false, deps = [], start = 'top 82%' } = options
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !el.children.length) return

      const children = Array.from(el.children) as HTMLElement[]

      gsap.fromTo(
        children,
        { opacity: 0, y: aboveFold ? 40 : 52 },
        {
          opacity: 1,
          y: 0,
          duration: aboveFold ? 0.75 : 0.82,
          stagger: 0.13,
          ease: 'power3.out',
          clearProps: 'all',
          ...(aboveFold ? {} : { scrollTrigger: { trigger: el, start, once: true } }),
        }
      )
    },
    { scope: ref, dependencies: deps }
  )

  return ref
}
