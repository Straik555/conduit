import React, { FC } from 'react'
import { ButtonIcon, ButtonProps } from './Button.types'
import cn from 'clsx'
import { Add, Edit, Favorite } from '../../assets'

const Button: FC<ButtonProps> = ({
	title,
	icon,
	className,
	classNameIcon,
	classNameTitle,
	height,
	width,
	fill,
	...rest
}) => {
	const renderIcon = () => {
		switch (icon) {
			case ButtonIcon.FAVORITE:
				return (
					<Favorite
						className={classNameIcon}
						height={height}
						width={width}
						fill={fill}
					/>
				)
			case ButtonIcon.ADD:
				return <Add className={classNameIcon} height={height} width={width} />
			case ButtonIcon.EDIT:
				return <Edit className={classNameIcon} height={height} width={width} />
		}
	}

	return (
		<button
			className={cn(
				'flex items-center justify-between cursor-pointer rounded-lg border-[1px] text-green fill-green border-green px-2 py-1 hover:bg-green hover:fill-current hover:fill-white hover:text-white',
				className
			)}
			{...rest}
		>
			{renderIcon()}
			<p className={cn('text-sm p-0.5', classNameTitle)}>{title}</p>
		</button>
	)
}

export default Button
