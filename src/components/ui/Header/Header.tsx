import { Button } from '../Button/Button'
import { ReactComponent as BurgerIcon } from '@/assets/images/general/burger.svg'
import { Logo } from '../Logo/Logo'
import { NavLinks } from '../NavLinks/NavLinks'
import { LanguageToggler } from '../../../components/business/LanguageToggler/LanguageToggler'
import { AuthButton } from '../../../components/business/auth/AuthButton/AuthButton'
import { SearchFilmButton } from '../../../components/business/SearchFilmButton/SearchFilmButton'

interface HeaderProps {
  onMenu?: () => void
}

export const Header = ({ onMenu }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between py-3 container border-b border-noir-border">
      <Logo />

      {/* Nav links — desktop only */}
      <NavLinks className="hidden xl:flex items-center gap-7" />

      {/* Controls — far right */}
      <div className="flex items-center gap-2">
        <Button onClick={onMenu} variant="icon" className="md:hidden">
          <BurgerIcon />
        </Button>

        <SearchFilmButton />
        <LanguageToggler />
        <AuthButton />
      </div>
    </header>
  )
}
