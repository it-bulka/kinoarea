import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, TypographyTypes } from '../../components/ui/Typography/Typography'
import { Breadcrumbs } from '../../components/ui/Breadcrumbs/Breadcrumbs'
import { DateInput } from '../../components/ui/DateInput/DateInput'
import { CustomSelect } from '../../components/ui/Select/Select'
import { Button } from '../../components/ui/Button/Button'
import { genresOptions } from '../../utils/getGenres'
import { IOption } from '../../utils/getSelectedOption'

interface PremiereFiltersProps {
  startDate: Date | null
  endDate: Date | null
  tomorrowDate: Date
  sortValue: IOption[] | null
  onStartDateChange: (date: Date | null) => void
  onEndDateChange: (date: Date | null) => void
  onSortChange: (options: IOption[] | null) => void
  onConfirm: () => void
  isConfirmDisabled: boolean
}

// eslint-disable-next-line react/display-name
export const PremiereFilters = memo(
  ({
    startDate,
    endDate,
    tomorrowDate,
    sortValue,
    onStartDateChange,
    onEndDateChange,
    onSortChange,
    onConfirm,
    isConfirmDisabled,
  }: PremiereFiltersProps) => {
    const { t } = useTranslation()

    return (
      <section className={'container'}>
        <div>
          <Typography
            className={'max-w-[284px] mx-auto text-center md:max-w-full md:text-start'}
            variant={'h1'}
            type={TypographyTypes._TITLE}
          >
            {t('premiere.title')}
          </Typography>
          <Breadcrumbs className={'flex-center mt-1 mb-2 md:justify-start md:mb-1.5 lg:mb-2 2xl:mb-3.5'} />
          <p className={'text-13 font-q-500 text-center md:text-start md:text-15 2xl:text-lg'}>
            {t('premiere.description')}
          </p>
        </div>
        <div className={'my-[21.5px]'}>
          <Typography className={'text-center md:text-left'}>{t('premiere.period')}</Typography>
          <div className={'flex md:w-1/2 lg:w-2/5'}>
            <DateInput
              date={startDate || tomorrowDate}
              onChange={onStartDateChange}
              placeholderText={t('premiere.startDate')}
              wrapperClassName={'flex-1'}
            />
            <span className={'px-3 lg:flex-[0.5] flex-center'}>-</span>
            <DateInput
              date={endDate}
              onChange={onEndDateChange}
              placeholderText={t('premiere.endDate')}
              wrapperClassName={'flex-1'}
            />
          </div>
        </div>
        <div className={'my-[21.5px]'}>
          <Typography className={'text-center md:text-left'}>{t('premiere.genres')}</Typography>
          <CustomSelect
            options={genresOptions}
            value={sortValue}
            onChange={selectedOptions => onSortChange(selectedOptions as IOption[])}
            placeholder={t('premiere.allGenres')}
            className={'md:w-1/2 lg:w-2/5'}
            isMulti
            withCustomOptions
          />
        </div>
        <Button
          className={'ml-auto disabled:opacity-50 disabled:cursor-not-allowed'}
          onClick={onConfirm}
          disabled={isConfirmDisabled}
        >
          {t('premiere.confirm')}
        </Button>
      </section>
    )
  }
)
