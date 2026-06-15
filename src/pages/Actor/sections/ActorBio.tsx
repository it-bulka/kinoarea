import { twMerge } from 'tailwind-merge'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../../../components/ui/Breadcrumbs/Breadcrumbs'
import { Descript } from '../../../components/ui/Descript/Descript'
import { Button } from '../../../components/ui/Button/Button'
import { useSeeMore } from '../../../hooks/useSeeMore'
import { getDate, setMovieDBPath } from '../../../utils'
import Avatar from '../../../assets/images/general/avatar.svg'

interface ActorBioProps {
  name: string
  profile_path: string | null
  biography: string
  also_known_as: string[]
  birthday: string | null
  place_of_birth: string | null
  known_for_department: string
}

export const ActorBio = ({
  name,
  profile_path,
  biography,
  also_known_as,
  birthday,
  place_of_birth,
  known_for_department,
}: ActorBioProps) => {
  const { t } = useTranslation()
  const { isSeeMorePossible, setSeeMore, ref, isMatchedSize } = useSeeMore<HTMLDivElement>()

  return (
    <section className={'md:flex md:flex-row-reverse md:justify-end md:gap-[17px] lg:gap-8 2xl:gap-[54px]'}>
      <div>
        <div className={'w-full mb-3 md:mb-4'}>
          <Breadcrumbs lastCrumb={name} />
          <h3 className={'text-32 font-q-900 mb-1 md:text-40 md:my-[3px] 2xl:text-60'}>{name}</h3>
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
              <Button
                onClick={() => setSeeMore(false)}
                variant={'white'}
                size={'sm'}
                className={'mt-5 self-center sm:self-auto'}
              >
                {t('actor.readMore')}
              </Button>
            </div>
          )}
          {!isMatchedSize && !isSeeMorePossible && (
            <div className={'flex justify-end'}>
              <Button
                onClick={() => setSeeMore(true)}
                variant={'transparent'}
                size={'sm'}
                className={'mt-5 self-center sm:self-auto'}
              >
                {t('actor.showLess')}
              </Button>
            </div>
          )}
        </div>

        <div>
          {!!also_known_as.length && <Descript title={t('actor.alsoKnownAs')} descriptions={also_known_as} />}
          {birthday && <Descript title={t('actor.birthday')} descriptions={getDate(birthday)} />}
          {place_of_birth && <Descript title={t('actor.birthPlace')} descriptions={place_of_birth} />}
          <Descript title={t('actor.career')} descriptions={known_for_department} />
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
  )
}
