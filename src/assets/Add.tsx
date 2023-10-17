import React, { FC } from 'react'
import { IconProps } from './type'

const Add: FC<IconProps> = ({ height = 19, className, width = 19 }) => {
	return (
		<svg
			enableBackground='new 0 0 50 50'
			id='Layer_1'
			version='1.1'
			viewBox='0 0 50 50'
			width={width}
			height={height}
			xmlns='http://www.w3.org/2000/svg'
			className={className}
		>
			<line
				fill='none'
				strokeMiterlimit='10'
				strokeWidth='4'
				x1='9'
				x2='41'
				y1='25'
				y2='25'
			/>
			<line
				fill='none'
				strokeMiterlimit='10'
				strokeWidth='4'
				x1='25'
				x2='25'
				y1='9'
				y2='41'
			/>
		</svg>
	)
}

export default Add
