import { ArticleTypes } from '../../../api/profile/types'

export type ArticleHeaderTypesProps = {
	onFavorite: () => void
	onFollow: () => void
	titleFollowing: string
} & Pick<ArticleTypes, 'slug' | 'favoritesCount' | 'createdAt' | 'author'>
