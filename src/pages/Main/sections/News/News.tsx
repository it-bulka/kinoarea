import { SectionHeader, SectionHeaderType } from '../../../../components/ui/SectionHeader/SectionHeader'
import { NewsList } from '../../../../components/ui/NewsList/NewsList'
import { useTranslation } from 'react-i18next'
import { useMainSectionReveal } from '../../hooks/useMainSectionReveal'

export const News = () => {
  const { t } = useTranslation()
  const sectionRef = useMainSectionReveal()
  return (
    <section ref={sectionRef} className={'pt-7 pb-3.5 md:pt-8 md:pb-7 lg:pt-11 lg:pb-[42px] 2xl:pt-16 2xl:pb-[75px]'}>
      <SectionHeader
        title={t('main.latestNews')}
        type={SectionHeaderType.ARROW}
        linkTitle={t('main.allNews')}
        className={'mb-4 md:mb-2 2xl"mb-16'}
        moveToViaArrow={'/news'}
      />
      <NewsList />
    </section>
  )
}
