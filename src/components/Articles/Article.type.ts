import { ArticleTypes } from '../../api/profile/types'
import { TypePagination } from '../Pagination/Pafination'
import { ArticleItemTypeProps } from './ArticleItem/ArticleItem.types'

export type ArticleTypeProps = {
	forcePage: number
	totalCount: number
	articles?: ArticleTypes[]
} & Pick<TypePagination, 'onClickPage'> &
	Pick<ArticleItemTypeProps, 'onFavorite'>
