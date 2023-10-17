import React, { FC } from 'react'
import { ArticleUser, Button } from '~components'
import { ButtonIcon } from '~components/Button/Button.types'
import { generatePath, useNavigate } from 'react-router-dom'
import { ROUTES } from '~navigation/Navigation.type'
import { ArticleHeaderTypesProps } from './ArticleHeader.types'

const ArticleHeader: FC<ArticleHeaderTypesProps> = ({
	slug,
	favoritesCount,
	createdAt,
	author,
	onFollow,
	onFavorite,
	titleFollowing
}) => {
	const navigate = useNavigate()
	return (
		<div className='flex flex-col p-6 bg-gray-700 opacity-90'>
			<div className='max-w-content mx-auto'>
				<h2 className='text-white font-medium text-4xl mb-10'>
					{slug.slice(0, slug.length - 7)}
				</h2>
				<div className='flex items-center'>
					<ArticleUser
						author={author}
						createdAt={createdAt}
						classNameTitle='text-white hover:text-white'
						classNameDate='text-gray-400'
						onClick={() =>
							navigate(
								generatePath(ROUTES.PROFILE, { username: author.username })
							)
						}
					/>
					<Button
						title={titleFollowing}
						icon={ButtonIcon.ADD}
						classNameTitle='!text-xs'
						className='ml-4 mr-2 !text-gray-700 bg-gray-400 stroke-gray-700 !border-gray-400 hover:bg-gray-200'
						onClick={onFollow}
					/>
					<Button
						title={`Favourite Article (${favoritesCount})`}
						icon={ButtonIcon.FAVORITE}
						classNameTitle='!text-xs'
						onClick={onFavorite}
					/>
				</div>
			</div>
		</div>
	)
}

export default ArticleHeader
