import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Typography, TypographyTypes } from '../Typography/Typography'
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import cls from './PageHero.module.scss'

interface PageHeroProps {
  title: string
  supertitle?: string
  description?: string
  lastCrumb?: string
  crumbLabels?: Record<string, string>
}

export const PageHero = ({ title, supertitle, description, lastCrumb, crumbLabels }: PageHeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (supertitle) {
        gsap.from('.page-hero-supertitle', { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
      }
      gsap.from('.page-hero-title', { y: 60, opacity: 0, duration: 1, delay: supertitle ? 0.1 : 0, ease: 'power3.out' })
      gsap.from('.page-hero-breadcrumbs', { y: 25, opacity: 0, duration: 0.6, delay: 0.25, ease: 'power2.out' })
      if (description) {
        gsap.from('.page-hero-subtitle', { y: 30, opacity: 0, duration: 0.7, delay: 0.35, ease: 'power2.out' })
      }
    },
    { scope: heroRef }
  )

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-4 pb-5 md:pt-6 md:pb-7 mb-4 md:mb-6">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className={cls.heroBg} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-noir" />
      </div>
      <div className="relative z-10">
        {supertitle && (
          <p className="page-hero-supertitle mb-1 text-sm md:text-base text-text-muted font-inter">{supertitle}</p>
        )}
        <Typography variant="h1" type={TypographyTypes._TITLE} className="page-hero-title">
          {title}
        </Typography>
        <div className="page-hero-breadcrumbs">
          <Breadcrumbs lastCrumb={lastCrumb} crumbLabels={crumbLabels} />
        </div>
        {description && (
          <p className="page-hero-subtitle mt-2 text-sm md:text-base text-text-muted max-w-xl">{description}</p>
        )}
      </div>
    </div>
  )
}
