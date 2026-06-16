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
        <Typography
          className={'max-w-[284px] mx-auto text-center md:max-w-full md:text-start'}
          variant={'h1'}
          type={TypographyTypes._TITLE}
        >
          {t('premiere.title')}
        </Typography>
        <Breadcrumbs className={'flex-center mt-1 mb-2 md:justify-start md:mb-1.5 lg:mb-2 2xl:mb-3.5'} />
        <p
          className={'text-13 font-inter font-medium text-text-muted text-center md:text-start md:text-15 2xl:text-lg'}
        >
          {t('premiere.description')}
        </p>

        <div className={'flex flex-wrap items-end gap-4 mt-5 md:gap-6 md:mt-6'}>
          <div className={'w-full md:w-auto md:flex-shrink-0'}>
            <p className={'text-sm font-inter font-medium text-text-base mb-2'}>{t('premiere.period')}</p>
            <div className={'flex items-center gap-2'}>
              <DateInput
                date={startDate || tomorrowDate}
                onChange={onStartDateChange}
                placeholderText={t('premiere.startDate')}
                wrapperClassName={'flex-1 md:w-[155px] md:flex-none'}
              />
              <span className={'text-text-muted text-sm select-none'}>—</span>
              <DateInput
                date={endDate}
                onChange={onEndDateChange}
                placeholderText={t('premiere.endDate')}
                wrapperClassName={'flex-1 md:w-[155px] md:flex-none'}
              />
            </div>
          </div>

          <div className={'flex-1 min-w-[200px] md:max-w-[360px]'}>
            <p className={'text-sm font-inter font-medium text-text-base mb-2'}>{t('premiere.genres')}</p>
            <CustomSelect
              options={genresOptions}
              value={sortValue}
              onChange={selectedOptions => onSortChange(selectedOptions as IOption[])}
              placeholder={t('premiere.allGenres')}
              isMulti
              withCustomOptions
            />
          </div>

          <Button
            className={'disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0'}
            onClick={onConfirm}
            disabled={isConfirmDisabled}
          >
            {t('premiere.confirm')}
          </Button>
        </div>
      </section>
    )
  }
)
