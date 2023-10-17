import { SVGAttributes } from 'react'

export type IconProps = Pick<
	SVGAttributes<SVGElement>,
	'fill' | 'width' | 'height' | 'className' | 'onClick'
>
