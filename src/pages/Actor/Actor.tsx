import { Outlet, useLoaderData, useNavigate, useRevalidator } from 'react-router-dom'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { getDate, setMovieDBPath } from '../../utils'
import { IPersonFullInfo } from '../../api/types/responses'
import { Descript } from '../../components/ui/Descript/Descript'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { MovieItem } from '../../components/ui/MovieItem/MovieItem'
import { SectionHeader, SectionHeaderType } from '../../components/ui/SectionHeader/SectionHeader'
import { Images } from './sections/Images'
import { useLastPathSegment } from '../../hooks/useLastPathsegment'
import Avatar from '../../assets/images/general/avatar.svg'
import { twMerge } from 'tailwind-merge'
import { useSeeMore } from '../../hooks/useSeeMore'
import { Button } from '../../components/ui/Button/Button'
import classNames from 'classnames'
import { usePaginateData } from '../../hooks/usePaginateData'
import { Pagination } from '../../components/ui/Pagination/Pagination'
import { useCallback, useEffect } from 'react'
import type { IPersonCombinedCredits } from '../../api/types/responses'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ActorSkeleton } from './ActorSkeleton'

const filmsPerPageAmount = 10
interface ActorFilmsPagination {
  total_pages: number
  page: number
  max_per_page: number
}
export const Actor = () => {
  const actor = useLoaderData() as IPersonFullInfo
  const lastSegment = useLastPathSegment()
  const language = useTypedSelector(state => state.language.current)
  const revalidator = useRevalidator()

  useEffect(() => {
    revalidator.revalidate()
  }, [language])

  const { isSeeMorePossible, setSeeMore, ref, isMatchedSize } = useSeeMore<HTMLDivElement>()
  const {
    data: filmsPerPage,
    setData: setFilmsPerPage,
    pagesData,
    setPagesData,
    onPaginationChange,
  } = usePaginateData<IPersonCombinedCredits[], ActorFilmsPagination>()
  const navigate = useNavigate()

  useEffect(() => {
    const films = actor?.combined_credits?.cast
    if (!films) return

    const filmsAmount = films.length
    const max_per_page = filmsPerPageAmount
    const total_pages = Math.ceil(filmsAmount / max_per_page)
    const startPage = 1
    setPagesData({ total_pages, page: startPage, max_per_page })
    setFilms(startPage)
  }, [actor])

  const setFilms = useCallback(
    (page: number) => {
      const endItem = page * filmsPerPageAmount
      const startItem = endItem - filmsPerPageAmount
      const filmsToShow = actor.combined_credits.cast.slice(startItem, endItem + 1)
      setFilmsPerPage(filmsToShow)
    },
    [actor.combined_credits.cast, setFilmsPerPage]
  )
  const switchFilms = (page: number) => {
    setFilms(page)
    setPagesData({ total_pages: pagesData!.total_pages, max_per_page: pagesData!.max_per_page, page })
  }

  if (revalidator.state === 'loading') return <ActorSkeleton />
  if (!actor) return <div>Такого актора не найдено</div>

  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,
    known_for_department,
    also_known_as,
    combined_credits,
    images,
  } = actor

  if (lastSegment === 'images') {
    return <Outlet context={{ images: images.profiles, title: name }} />
  }

  return (
    <div className={'container'}>
      <section className={'md:flex md:flex-row-reverse md:justify-end md:gap-[17px] lg:gap-8 2xl:gap-[54px]'}>
        <div>
          <div className={'w-full mb-3 md:mb-4'}>
            <Breadcrumbs lastCrumb={name} />
            <h3 className={'text-32 font-q-900 mb-1 md:text-40 md:my-[3px] 2xl:text-60'}>{actor.name}</h3>
          </div>
          <div>
            <img
              src={setMovieDBPath(profile_path)}
              alt={'film'}
              className={'rounded-10 w-[63%] object-cover aspect-[230/310] md:hidden'}
            />
          </div>
          <div className={'mt-4 mb-11 md:my-4 '}>
            <p
              className={twMerge(
                classNames('max-h-[7.5em] overflow-hidden text-ellipsis text-justify', {
                  'max-h-none': !isSeeMorePossible,
                })
              )}
              ref={ref}
            >
              {biography}
            </p>
            {!isMatchedSize && isSeeMorePossible && (
              <div className={'flex justify-between items-start flex-col sm:flex-row'}>
                <span className={'leading-[0px]'}>...</span>
                <Button onClick={() => setSeeMore(false)} variant={'white'} className={'mt-5 self-center sm:self-auto'}>
                  Читать полностью
                </Button>
              </div>
            )}
            {!isMatchedSize && !isSeeMorePossible && (
              <div className={'flex justify-end'}>
                <Button
                  onClick={() => setSeeMore(true)}
                  variant={'transparent'}
                  className={'mt-5 self-center sm:self-auto'}
                >
                  Уменьшить текст
                </Button>
              </div>
            )}
          </div>

          <div>
            {!!also_known_as.length && <Descript title={'Извесный как'} descriptions={also_known_as} />}
            {birthday && <Descript title={'Дата рождения'} descriptions={getDate(birthday)} />}
            {place_of_birth && <Descript title={'Место рождения'} descriptions={place_of_birth} />}
            <Descript title={'Карьера'} descriptions={known_for_department} />
          </div>
        </div>

        <div>
          {profile_path ? (
            <img
              src={setMovieDBPath(profile_path)}
              alt={'film'}
              className={'hidden rounded-10 object-cover aspect-[230/310] md:block md:max-w-[297px]'}
            />
          ) : (
            <img src={Avatar} alt={'avatar'} className={twMerge('avatar')} />
          )}
        </div>
      </section>

      <section>
        <Typography variant={'h4'} type={TypographyTypes._TITLE}>
          Фильмы
        </Typography>
        <div>
          <p>Всего найдено фильмов: {combined_credits?.cast.length}</p>
          {(!combined_credits.cast || !combined_credits?.cast.length) && <p>Фильмов для отображения не найдено</p>}
          {filmsPerPage?.map(item => (
            <MovieItem
              name={item.media_type === 'movie' ? item.title : item.name}
              img={item.poster_path}
              overview={item.overview}
              character={`Роль: ${item.character}`}
              rating={item.vote_average}
              key={item.id}
              onClick={() => navigate(`/films/${item.id}`)}
            />
          ))}
        </div>
        {pagesData && (
          <Pagination
            totalCount={combined_credits?.cast.length}
            currentPage={pagesData.page}
            siblingCount={pagesData.total_pages >= 5 ? 2 : undefined}
            pageSize={filmsPerPageAmount}
            onPageChange={(pageNum: number) => onPaginationChange(pageNum, switchFilms)}
            className={'mx-auto mt-4 md:mt-8 ld:mt-9 2xl:mt-11'}
          />
        )}
      </section>
      <section>
        <SectionHeader title={'Фото'} type={SectionHeaderType.ARROW} linkTitle={'Все фото'} moveToViaArrow={'images'} />
        <Images list={images?.profiles} title={name} />
      </section>
    </div>
  )
}
