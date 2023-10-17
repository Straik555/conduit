import React, { FC } from 'react'
import { generatePath, useNavigate } from 'react-router-dom'
import {
	ArticleUser,
	Button,
	Layout,
	NothingToShow,
	TagItem
} from '../../components'
import ArticleHeader from './ArticleHeader'
import { ButtonIcon } from '../../components/Button/Button.types'
import { ROUTES } from '../../navigation/Navigation.type'
import { useAuth } from '../../hooks/useState'
import { Method } from '../../api/profile/types'
import { useArticle } from './useArticle'
import { Comments } from '~components'

const Article: FC = () => {
	const navigate = useNavigate()
	const { token, username } = useAuth()
	const { articles, favorite, follow, comments, isLoading, deleteComment } =
		useArticle()

	return (
		<Layout isHiddenBlock isLoadingAbsolut={isLoading}>
			{!!articles ? (
				<>
					<ArticleHeader
						{...articles.article}
						titleFollowing={
							!!token && articles.article.author.username === username
								? 'Edit Profile Settings'
								: articles.article.author.following
								? `Follow ${articles?.article.author.username}`
								: `Unfollow ${articles?.article.author.username}`
						}
						onFollow={() =>
							!!token
								? follow({
										username: articles.article.author.username,
										method: articles.article.author.following
											? Method.DELETE
											: Method.POST
								  })
								: navigate(ROUTES.SIGN_IN)
						}
						onFavorite={() =>
							!!token
								? favorite({
										slug: articles.article.slug,
										method: articles.article.favorited
											? Method.DELETE
											: Method.POST
								  })
								: navigate(ROUTES.SIGN_IN)
						}
					/>
					<div className='max-w-content mx-auto'>
						<p className='text-lg py-6'>{articles.article.body}</p>
						<div className='flex items-center border-b-[1px] border-gray-200 pb-6'>
							{articles.article.tagList.map(tag => (
								<TagItem key={tag} title={tag} />
							))}
						</div>
						<div className='flex items-center mt-6'>
							<ArticleUser
								author={articles.article.author}
								createdAt={articles.article.createdAt}
								classNameTitle='!text-gray-600'
								classNameDate='text-gray-400'
								onClick={() =>
									navigate(
										generatePath(ROUTES.PROFILE, {
											username: articles.article.author.username
										})
									)
								}
							/>
							<Button
								title={`Unfollow ${articles?.article.author.username}`}
								icon={ButtonIcon.ADD}
								classNameTitle='!text-xs'
								className='ml-4 mr-2 !text-gray-700 bg-gray-100 stroke-gray-500 !border-gray-300 hover:bg-gray-200'
								onClick={() =>
									!!token
										? follow({
												username: articles.article.author.username,
												method: articles.article.author.following
													? Method.DELETE
													: Method.POST
										  })
										: navigate(ROUTES.SIGN_IN)
								}
							/>
							<Button
								title={`Favourite Article (${articles.article.favoritesCount})`}
								icon={ButtonIcon.FAVORITE}
								classNameTitle='!text-xs'
								onClick={() =>
									!!token
										? favorite({
												slug: articles.article.slug,
												method: articles.article.favorited
													? Method.DELETE
													: Method.POST
										  })
										: navigate(ROUTES.SIGN_IN)
								}
							/>
						</div>
						{!!comments &&
							comments.comments.map(comment => (
								<Comments
									key={comment.id}
									body={comment.body}
									createdAt={comment.createdAt}
									image={comment.author.image}
									username={comment.author.username}
									onDelete={() => deleteComment(comment.id)}
								/>
							))}
					</div>
				</>
			) : (
				<NothingToShow title='No articles are here... yet.' />
			)}
		</Layout>
	)
}

export default Article
