import React, { FC } from 'react'
import { IconProps } from './type'

const Edit: FC<IconProps> = ({
	height = 10,
	width = 10,
	fill = '#9ca3af',
	className
}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 16 16'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_2868_59590)'>
				<path
					d='M9.88086 2.6875L1.07744 11.4916C1.03315 11.536 1.00117 11.5921 0.985939 11.6523L0.0101637 15.5689C-0.0190245 15.6868 0.0156207 15.8122 0.101662 15.8982C0.166765 15.9633 0.255472 15.9994 0.346209 15.9994C0.374001 15.9994 0.402428 15.9959 0.430094 15.989L4.34665 15.0131C4.40769 14.9978 4.46315 14.966 4.50744 14.9217L13.3116 6.11826L9.88086 2.6875Z'
					fill={fill}
				/>
				<path
					d='M15.4943 1.48657L14.5143 0.506606C13.8594 -0.148353 12.7179 -0.147718 12.0637 0.506606L10.8633 1.707L14.2939 5.13764L15.4943 3.93724C15.8215 3.6102 16.0017 3.17492 16.0017 2.71197C16.0017 2.24902 15.8215 1.81373 15.4943 1.48657Z'
					fill={fill}
				/>
			</g>
			<defs>
				<clipPath id='clip0_2868_59590'>
					<rect width='16' height='16' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}

export default Edit
