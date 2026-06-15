import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import cls from './Collections.module.scss'

interface CollectionsHeroProps {
  title: string
  description: string
}

export const CollectionsHero = ({ title, description }: CollectionsHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('.hero-title', { y: 70, opacity: 0, duration: 1, ease: 'power3.out' })
      gsap.from('.hero-subtitle', { y: 40, opacity: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' })
    },
    { scope: heroRef }
  )

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-8 pb-10 md:pt-12 md:pb-14 mb-6 md:mb-10">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className={cls.heroBg} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-darkBlue" />
      </div>
      <div className="relative z-10">
        <Typography variant="h1" type={TypographyTypes._TITLE} className="hero-title">
          {title}
        </Typography>
        <Breadcrumbs />
        <p className="hero-subtitle mt-2 text-sm md:text-base text-white/60 max-w-xl">{description}</p>
      </div>
    </div>
  )
}
