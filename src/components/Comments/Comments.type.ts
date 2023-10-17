import { UserType } from '~/api/auth/types'
import { ArticleTypes } from '~/api/profile/types'

export type CommentsType = {
	onDelete: () => void
} & Pick<ArticleTypes, 'body' | 'createdAt'> &
	Pick<UserType, 'image' | 'username'>
