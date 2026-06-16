import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface BreadcrumbsProps {
  className?: string
  lastCrumb?: string
  crumbLabels?: Record<string, string>
}
export const Breadcrumbs = ({ className, lastCrumb, crumbLabels }: BreadcrumbsProps) => {
  const { t } = useTranslation()
  const locations = useLocation()
  const { slug } = useParams()
  let current = ''
  const othersCrumbs = locations.pathname
    .split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => (current += '/' + crumb))
  const crumbs = ['/', ...othersCrumbs]

  if (lastCrumb) {
    crumbs[crumbs.length - 1] = lastCrumb
  }

  return (
    <ul className={`flex flex-wrap ${className} text-sm font-inter font-medium w-fit`}>
      {crumbs.map(item => (
        <li
          key={item}
          className={`text-text-muted [&:not(:last-of-type):after]:content-breadcrumbs
             [&:not(:last-of-type):after]:pl-2 [&:not(:last-of-type)]:pr-2 last-of-type:text-text-base hover:[&:not(:last-of-type)]:underline`}
        >
          <Link to={item}>{crumbLabels?.[item] ?? t(`breadcrumbs.${item}`, lastCrumb || slug || item)}</Link>
        </li>
      ))}
    </ul>
  )
}
