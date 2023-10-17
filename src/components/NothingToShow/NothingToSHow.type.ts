import { AriaAttributes, HTMLAttributes } from 'react'

export type NothingToSHowType = {
	title: string
} & Pick<HTMLAttributes<AriaAttributes>, 'className'>
