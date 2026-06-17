import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button/Button'

export const RouteErrorFallback = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <section className="pt-7 pb-9 md:pb-11 lg:pb-20 2xl:pt-[122px] 2xl:pb-[133px] flex items-center h-full">
      <div className="container text-center">
        <div className="text-4xl font-playfair font-bold md:text-50/[80px]">
          <h2>{is404 ? '404' : 'Oops!'}</h2>
          <h2>{is404 ? t('notFound.subtitle') : t('error.routeTitle')}</h2>
        </div>
        <p className="text-15 leading-[25px] font-inter font-medium mt-4 mb-7 px-2 md:text-lg md:mt-[26px]">
          {is404 ? t('notFound.message') : t('error.routeMessage')}
        </p>
        {import.meta.env.DEV && !is404 && error instanceof Error && (
          <pre className="text-xs text-red-400 bg-noir-card rounded-10 p-4 mb-6 mx-auto max-w-lg overflow-auto text-left">
            {error.message}
          </pre>
        )}
        <div className="flex flex-col gap-[15px] max-w-[425px] mx-auto md:max-w-full md:flex-row md:justify-center">
          <Button className="py-[18px] md:w-[243px]" onClick={() => navigate('/')}>
            {t('error.goHome')}
          </Button>
          <Button variant="transparent" className="py-[18px] md:w-[243px]" onClick={() => navigate(0)}>
            {t('error.tryAgain')}
          </Button>
        </div>
      </div>
    </section>
  )
}
