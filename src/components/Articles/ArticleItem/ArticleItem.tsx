import React, { FC } from 'react'
import { ArticleUser } from '../index'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../navigation/Navigation.type'
import { Button, TagItem } from '../../index'
import { ButtonIcon } from '../../Button/Button.types'
import { Method } from '../../../api/profile/types'
import { ArticleItemTypeProps } from './ArticleItem.types'

const ArticleItem: FC<ArticleItemTypeProps> = ({ articles, onFavorite }) => {
	const navigate = useNavigate()
	return (
		<div className='flex flex-col w-full'>
			{articles.map((article, index) => {
				return (
					<div
						className='flex flex-col w-full border-b-[1px] border-gray-200 py-3'
						key={index}
					>
						<div className='flex justify-between items-center w-full mb-4'>
							<ArticleUser
								{...article}
								onClick={() =>
									navigate(
										generatePath(ROUTES.PROFILE, {
											username: article.author.username
										})
									)
								}
							/>
							<Button
								title={article.favoritesCount}
								icon={ButtonIcon.FAVORITE}
								onClick={() =>
									onFavorite(
										article.slug,
										article.favorited ? Method.DELETE : Method.POST
									)
								}
							/>
						</div>
						<div
							className='flex flex-col cursor-pointer'
							onClick={() =>
								navigate(generatePath(ROUTES.ARTICLE, { slug: article.slug }))
							}
						>
							<p className='text-2xl text-black font-medium'>{article.title}</p>
							<p className='text-gray-300 text-base mb-3'>
								{article.description}
							</p>
							<div className='flex items-center justify-between'>
								<p className='text-gray-300 text-sm'>Read more...</p>
								<div className='flex items-center'>
									{article.tagList.map(tag => (
										<TagItem title={tag} key={tag} />
									))}
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default ArticleItem
