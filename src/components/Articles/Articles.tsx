import React, { FC } from 'react'
import { Pagination } from '../index'
import { ArticleTypeProps } from './Article.type'
import NothingToShow from '../NothingToShow'
import ArticleItem from './ArticleItem'

const Articles: FC<ArticleTypeProps> = ({
	articles,
	onFavorite,
	forcePage,
	onClickPage,
	totalCount
}) => {
	return (
		<>
			{!!articles?.length ? (
				<>
					<ArticleItem articles={articles} onFavorite={onFavorite} />
					<Pagination
						pageCount={totalCount}
						onClickPage={onClickPage}
						forcePage={forcePage}
					/>
				</>
			) : (
				<NothingToShow title='No articles are here... yet.' />
			)}
		</>
	)
}
export default Articles
