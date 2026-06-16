import { NavLinks } from '../NavLinks/NavLinks'
import { Link } from 'react-router-dom'
import { ReactComponent as LinkedIcon } from '../../../assets/images/general/linkedin-in.svg'
import { ReactComponent as InstagramIcon } from '../../../assets/images/general/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../../assets/images/general/facebook-f.svg'
import { ReactComponent as TwitterIcon } from '../../../assets/images/general/icons8-twitter.svg'
import { ReactComponent as YoutubeIcon } from '../../../assets/images/general/youtube.svg'
import { scrollTop } from '../../../utils/scrollTop'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer
      className={
        'bg-noir-card pt-6 pb-[30px] md:pt-[34px] md:pb-[36px] lg:pt-10 2xl:pt-[61px] border-t border-noir-border'
      }
    >
      <div className={'container'}>
        <div className={'flex justify-around items-center text-text-muted max-w-[249px] m-auto'}>
          <LinkedIcon className={'hover:text-gold h-[22px] transition-colors'} />
          <InstagramIcon className={'hover:text-gold h-[22px] transition-colors'} />
          <FacebookIcon className={'hover:text-gold h-[22px] transition-colors'} />
          <TwitterIcon className={'hover:text-gold h-[22px] transition-colors'} />
          <YoutubeIcon className={'hover:text-gold h-[22px] transition-colors'} />
        </div>
        <NavLinks
          className={`flex flex-col text-center gap-3 my-5 text-13 leading-[33px]
            md:flex-row md:justify-around md:max-w-[552px] md:mx-auto md:my-6
            2xl:mt-[34px] 2xl:mb-[41px] 2xl:max-w-[724px]`}
          onClick={() => scrollTop()}
        />
        <div className={'flex flex-col gap-2 text-13 text-text-muted/70 text-center lg:gap-6'}>
          <p>{t('footer.copyright')}</p>
          <p>
            <Link to={'/'}>{t('footer.privacy')}</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
