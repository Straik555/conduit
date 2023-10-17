import { ArticlesTypesResponse, Method } from '../../../api/profile/types'

export type ArticleItemTypeProps = {
	onFavorite: (slug: string, method: Method) => void
} & Pick<ArticlesTypesResponse, 'articles'>
