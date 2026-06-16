import Select, { type ClassNamesConfig, type Props, type OptionProps, components } from 'react-select'
import classnames from 'classnames'
import { useMemo } from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import { twMerge } from 'tailwind-merge'

const { Option } = components
const CustomOption = (props: OptionProps) => {
  return (
    <Option {...props}>
      <Checkbox
        label={props.label}
        isChecked={props.isSelected}
        name={props.label}
        className={'text-inherit pointer-events-none'}
      />
    </Option>
  )
}

interface CustomSelectProps extends Props {
  withCustomOptions?: boolean
  options: { label: string; value: string }[]
}
export const CustomSelect = ({
  options,
  classNames,
  isMulti,
  isClearable = true,
  withCustomOptions,
  ...rest
}: CustomSelectProps) => {
  const classes = useMemo(() => {
    const defaultClasses: ClassNamesConfig = {
      control: () => classnames('!input !select-padding !outline-none !shadow-none ![min-height:unset]'),
      menu: () => classnames('!input !input-padding !bg-noir-card'),
      menuList: () => classnames('!max-h-[150px]'),
      option: state =>
        twMerge(classnames('!bg-inherit !border-0 !text-options !text-15', { '!text-white': state.isSelected })),
      singleValue: () => '!text-white',
      multiValue: () => '!bg-transparent !text-white',
      multiValueLabel: () => '!text-white',
      multiValueRemove: () => '!hidden',
      input: () => '!text-white',
      indicatorSeparator: () => '!hidden',
      placeholder: () => '!text-options',
      valueContainer: () => '!p-0',
      dropdownIndicator: state => classnames('!text-inherit', { '!-scale-y-100': state?.selectProps.menuIsOpen }),
    }

    return classNames ? { ...defaultClasses, classNames } : defaultClasses
  }, [classNames])

  return (
    <Select
      options={options}
      classNames={classes}
      isMulti={isMulti}
      hideSelectedOptions={false}
      isClearable={isClearable}
      components={withCustomOptions ? { Option: CustomOption } : {}}
      {...rest}
    />
  )
}
