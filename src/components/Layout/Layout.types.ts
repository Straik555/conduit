import { PropsWithChildren, ReactNode } from 'react'

export type LayoutTypesProps = {
	children: PropsWithChildren<ReactNode>
	pagination?: ReactNode
	isLoadingAbsolut?: boolean
	isHiddenBlock?: boolean
}
