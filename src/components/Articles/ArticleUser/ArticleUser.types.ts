import { ArticleTypes } from '../../../api/profile/types'

export type ArticleUserTypeProps = {
	classNameTitle?: string
	classNameDate?: string
	onClick: () => void
} & Pick<ArticleTypes, 'createdAt' | 'author'>
