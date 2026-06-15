import { memo, useCallback } from 'react'
import classnames from 'classnames'
import { Button } from '../../components/ui/Button/Button'
import { CategoriesTypes } from '../../mock/categories'
import cls from './Collections.module.scss'

export type CategoryTag = {
  id: string
  title: string
  type: CategoriesTypes | 'all'
}

interface TagButtonProps {
  tag: CategoryTag
  isActive: boolean
  onTagClick: (tag: CategoryTag) => void
}

export const TagButton = memo(({ tag, isActive, onTagClick }: TagButtonProps) => {
  const handleClick = useCallback(() => onTagClick(tag), [onTagClick, tag])
  return (
    <Button
      data-tag={tag.id}
      className={classnames([cls.tagBtn], { [cls.notActive]: !isActive })}
      onClick={handleClick}
    >
      {tag.title}
    </Button>
  )
})

TagButton.displayName = 'TagButton'
