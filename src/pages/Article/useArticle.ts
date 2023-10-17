import { useParams } from 'react-router-dom'
import { ArticlePostTypesProps } from '~api/profile/types'
import {
	useDeleteCommentMutation,
	useFavoriteArticleMutation,
	useFollowUserMutation,
	useGetArticlePostQuery,
	useGetCommentsQuery
} from '~api/profile'
import { TypeErrorAuth } from '~api/auth/types'
import { useEffect, useMemo } from 'react'
import { getError } from '~utils/error'

export const useArticle = () => {
	const { slug } = useParams<ArticlePostTypesProps>()
	const [
		favorite,
		{
			isLoading: favoriteIsLoading,
			isError: favoriteIsError,
			error: favoriteError
		}
	] = useFavoriteArticleMutation()
	const [
		follow,
		{ isLoading: followIsLoading, error: followError, isError: followIsError }
	] = useFollowUserMutation()
	const {
		data: articles,
		isError: articlesIsError,
		error: articlesError,
		isLoading: articlesIsLoading
	} = useGetArticlePostQuery(String(slug), {
		skip: !slug
	})
	const {
		data: comments,
		isError: commentsIsError,
		error: commentsError,
		isLoading: commentsIsLoading
	} = useGetCommentsQuery(String(slug), {
		skip: !slug
	})
	const [
		deleteComments,
		{ isError: deleteCommentIsError, error: deleteCommentError }
	] = useDeleteCommentMutation()

	const err = (articlesError ||
		favoriteError ||
		followError ||
		commentsError ||
		deleteCommentError) as TypeErrorAuth

	const isLoading: boolean = useMemo(() => {
		return (
			followIsLoading ||
			favoriteIsLoading ||
			articlesIsLoading ||
			commentsIsLoading
		)
	}, [followIsLoading, favoriteIsLoading, articlesIsLoading, commentsIsLoading])

	useEffect(() => {
		if (
			articlesError ||
			favoriteError ||
			followError ||
			commentsError ||
			commentsIsError ||
			deleteCommentError ||
			deleteCommentIsError
		) {
			getError(err)
		}
	}, [
		articlesIsError,
		articlesError,
		favoriteError,
		favoriteIsError,
		followIsError,
		followError,
		commentsError,
		commentsIsError,
		deleteCommentError,
		deleteCommentIsError
	])

	const deleteComment = (id: number) =>
		deleteComments({ slug: String(slug), id })

	return {
		favorite,
		articles,
		follow,
		isLoading,
		comments,
		deleteComment
	}
}
