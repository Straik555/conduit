import { ButtonHTMLAttributes } from 'react'
import { IconProps } from '../../assets/type'

export type ButtonProps = {
	icon?: ButtonIcon
	title: number | string
	classNameIcon?: string
	classNameTitle?: string
} & Pick<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'className' | 'name' | 'type' | 'onClick'
> &
	Omit<IconProps, 'className'>

export enum ButtonIcon {
	ADD = 'add',
	FAVORITE = 'favorite',
	EDIT = 'edit'
}
