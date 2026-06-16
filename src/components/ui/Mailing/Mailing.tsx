import { useState } from 'react'
import { ReactComponent as Logo } from '../../../assets/images/general/logo-2.svg'
import { Checkbox } from '../Checkbox/Checkbox'
import { Link } from 'react-router-dom'
import { FirebaseApi } from '../../../api/firebase'
import { useActions } from '../../../hooks/useActions'
import { notificationList } from '../../../mock/notificationList'
import { useTranslation } from 'react-i18next'

const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

const classes = {
  input: 'text-center pt-[19px] pb-[18px] px-1 rounded-10 text-15',
}

export const Mailing = () => {
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { setNotification } = useActions()
  const { t } = useTranslation()

  const canSubmit = isValidEmail(email) && agreed && !submitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    try {
      await FirebaseApi.addSubscription(email)
      setNotification(notificationList.subscriptionSent)
      setEmail('')
      setAgreed(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className={'bg-noir-card pt-11 pb-6 border-t border-noir-border'}>
      <div className={'container'}>
        <div className={`bg-mailing bg-img rounded-10 overflow-hidden`}>
          <div className={'bg-noir/70 pt-[26px] pb-[25px] px-[23px] lg:px-[50px] 2xl:pt-[76px] 2xl:pb-[106px]'}>
            <div>
              <Logo className={'mx-auto'} />
            </div>
            <h3
              className={`text-25 font-playfair font-bold text-center max-w-[209px] mx-auto
                md:max-w-full md:text-35 2xl:mt-[51px] 2xl:text-50`}
            >
              {t('mailing.title')}
            </h3>
            <p
              className={`mt-[21px] mb-[29px] mx-auto text-base font-inter font-medium text-center
                md:my-6 md:max-w-[542px]
                2xl:max-w-[704px] 2xl:mt-[26px] 2xl:mb-[34px] 2xl:text-22`}
            >
              {t('mailing.description')}
            </p>

            <form
              className={'px-[19px] lg:max-w-[551px] mx-auto 2xl:max-w-[615px]'}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className={'flex flex-col md:flex-row gap-[9px] '}>
                <input
                  type={'email'}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t('mailing.emailPlaceholder')}
                  className={`${classes.input} text-gray-2 placeholder:text-gray-2/60 md:flex-1`}
                />
                <button
                  type={'submit'}
                  disabled={!canSubmit}
                  className={`${classes.input} bg-gold font-inter font-bold text-noir md:w-[164px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gold-light transition-colors`}
                >
                  {submitting ? '...' : t('mailing.subscribe')}
                </button>
              </div>
              <div className={'max-w-[272px]  mt-5 md:flex md:max-w-full'}>
                <Checkbox
                  label={
                    <span>
                      {t('mailing.privacy')}
                      <Link to={'/'} className={'text-gold-light'}>
                        {t('mailing.privacyLink')}
                      </Link>
                    </span>
                  }
                  name={'agreement'}
                  className={'mx-auto md:whitespace-nowrap'}
                  isChecked={agreed}
                  onChecked={setAgreed}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
