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
    <footer className={'bg-dark pt-6 pb-[30px] md:pt-[34px] md:pb-[36px] lg:pt-10 2xl:pt-[50px] 2xl:pt-[61px]'}>
      <div className={'container'}>
        <div className={'flex justify-around items-center text-blueIcon max-w-[249px] m-auto'}>
          <LinkedIcon className={'hover:text-white h-[22px]'} />
          <InstagramIcon className={'hover:text-white h-[22px]'} />
          <FacebookIcon className={'hover:text-white h-[22px]'} />
          <TwitterIcon className={'hover:text-white h-[22px]'} />
          <YoutubeIcon className={'hover:text-white h-[22px]'} />
        </div>
        <NavLinks
          className={`flex flex-col text-center gap-3 my-5 text-13 leading-[33px] text-q-700
            md:flex-row  md:justify-around md:max-w-[552px] md:mx-auto md:my-6
            2xl:mt-[34px] 2xl:mb-[41px] 2xl:max-w-[724px]`}
          onClick={() => scrollTop()}
        />
        <div className={'flex flex-col gap-2 text-13 text-gray-light/72 text-center lg:gap-6'}>
          <p>{t('footer.copyright')}</p>
          <p>
            <Link to={'/'}>{t('footer.privacy')}</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
