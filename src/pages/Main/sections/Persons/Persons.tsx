import { SectionHeader } from '../../../../components/ui/SectionHeader/SectionHeader'
import { SliderNav } from '../../../../components/ui/sliders/SliderNav/SliderNav'
import { PersonSlider } from '../../../../components/ui/sliders/PersonSlider/PersonSlider'
import { PersonsRating } from '../../../../components/ui/PersonsRating/PersonsRating'
import { useEffect, useRef, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { IPerson } from '../../../../api/types'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { persons } from '../../../../mock/categories'
import { setActiveItem } from '../../../../utils/setActiveItem'
import { ICategory } from '../../../../components/ui/Category/Category'
import type { SwiperRef } from 'swiper/react'
import { PersonsSkeleton } from './PersonsSkeleton'

const startSlidePos = 2
export const Persons = () => {
  const { fetchPopularPersons, changePersonActiveCategory } = useActions()
  const { popular: popularPersons, activeCategory, loading } = useTypedSelector(state => state.persons)

  const [bigPersonsList, setBigPersonsList] = useState<IPerson[]>([])
  const [smallPersonsList, setSmallPersonsList] = useState<IPerson[]>([])
  const slidePosition = useRef(startSlidePos)
  const swiperInstance = useRef<SwiperRef>(null)

  const setBigList = (): void => {
    if (!popularPersons) return
    const list = [...popularPersons]
    list.length = list.length - 4

    setBigPersonsList(list)
  }
  const setSmallList = (optional?: 'decr' | 'incr'): void => {
    if (optional === 'decr') slidePosition.current -= 2
    if (optional === 'incr') slidePosition.current += 2
    const position = slidePosition.current

    const list = popularPersons.map((item, order) => ({ ...item, position: order + 1 })).slice(position, 4 + position)
    setSmallPersonsList(list)
  }

  useEffect(() => {
    if (popularPersons.length) {
      setBigList()
      setSmallList()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularPersons])

  useEffect(() => {
    fetchPopularPersons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <PersonsSkeleton />

  const onCategoryChange = (item: ICategory) => {
    changePersonActiveCategory(item)
    fetchPopularPersons(item.id)
    swiperInstance.current?.swiper?.slideTo(0, 0)
    slidePosition.current = startSlidePos
  }

  return (
    <section>
      <div className={'flex-between'}>
        <SectionHeader
          title={'Популярные персоны'}
          categories={setActiveItem(persons, activeCategory.id)}
          onCategoryClick={onCategoryChange}
        />
        <SliderNav sliderName={'persons'} className={'slider-nav mt-[46px]'} />
      </div>
      <div className={'lg:grid lg:grid-cols-3 lg:gap-[1.317%]'}>
        <div className={'lg:col-span-2'}>
          <PersonSlider
            slides={bigPersonsList}
            name={'persons'}
            onSlideNext={() => setSmallList('incr')}
            onSlidePrev={() => setSmallList('decr')}
            ref={swiperInstance}
          />
        </div>
        <PersonsRating list={smallPersonsList} shift={slidePosition.current + 1} />
      </div>
    </section>
  )
}
