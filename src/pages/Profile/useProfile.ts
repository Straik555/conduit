import { useEffect, useMemo, useState } from 'react'
import { ProfileTypesTab } from './Profile.types'
import { useArticle } from '../../hooks/useState'
import { useParams } from 'react-router-dom'
import { ProfileTypeProps } from '../../api/profile/types'
import {
	useFavoriteArticleMutation,
	useFollowUserMutation,
	useGetAllArticlesFavoritesQuery,
	useGetArticleProfileQuery,
	useGetProfileQuery
} from '../../api/profile'
import { TypeErrorAuth } from '../../api/auth/types'
import { getPageCount } from '../../utils/page'
import { getError } from '../../utils/error'

export const useProfile = () => {
	const [activeTab, setActiveTabs] = useState<ProfileTypesTab>(
		ProfileTypesTab.MY_POSTS
	)
	const { myPosts, favoritePosts } = useArticle()
	const { username } = useParams<ProfileTypeProps>()
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
		data: user,
		isError: profileIsError,
		isLoading: profileIsLoading,
		error: profileError
	} = useGetProfileQuery(
		{ username: String(username) },
		{
			skip: !username
		}
	)
	const {
		data: articleMyPosts,
		isLoading: articleMyPostsIsLoading,
		isError: articleMyPostsIsError,
		error: articleMyPostsError,
		isFetching: articleMyPostsIsFetching,
		isSuccess: articleMyPostsIsSuccess
	} = useGetArticleProfileQuery(
		{
			author: String(user?.profile?.username),
			limit: 10,
			offset: myPosts
		},
		{
			skip: !user?.profile?.username,
			refetchOnMountOrArgChange: true
		}
	)

	const {
		data: articleFavoritePosts,
		isLoading: articleFavoritePostsIsLoading,
		isError: articleFavoritePostsIsError,
		error: articleFavoritePostsError,
		isFetching: articleFavoritePostsIsFetching,
		isSuccess: articleFavoritePostsIsSuccess
	} = useGetAllArticlesFavoritesQuery(
		{
			favorited: String(user?.profile?.username),
			limit: 10,
			offset: favoritePosts
		},
		{
			skip:
				!user?.profile?.username &&
				activeTab !== ProfileTypesTab.FAVORITE_POSTS,
			refetchOnMountOrArgChange: true
		}
	)

	const err = (profileIsError ||
		articleMyPostsError ||
		articleFavoritePostsError ||
		followError ||
		favoriteIsError) as TypeErrorAuth

	const totalCountMyPosts = useMemo(() => {
		if (!!articleMyPosts?.articles?.length) {
			return getPageCount(articleMyPosts?.articlesCount, 10)
		}
		return 0
	}, [articleMyPosts])

	const isPaginationMyPostLoading = useMemo(() => {
		return (
			!!articleMyPostsIsSuccess &&
			!articleMyPostsIsError &&
			!articleMyPostsIsFetching
		)
	}, [articleMyPostsIsSuccess, articleMyPostsIsError, articleMyPostsIsFetching])

	const isPaginationFavoritePostLoading = useMemo(() => {
		return (
			!!articleFavoritePostsIsSuccess &&
			!articleFavoritePostsIsError &&
			!articleFavoritePostsIsFetching
		)
	}, [
		articleFavoritePostsIsSuccess,
		articleFavoritePostsIsError,
		articleFavoritePostsIsFetching
	])

	const isLoading = useMemo(() => {
		return (
			articleMyPostsIsLoading ||
			followIsLoading ||
			articleMyPostsIsFetching ||
			favoriteIsLoading ||
			profileIsLoading ||
			articleFavoritePostsIsFetching ||
			articleFavoritePostsIsLoading
		)
	}, [
		articleMyPostsIsLoading,
		followIsLoading,
		articleMyPostsIsFetching,
		favoriteIsLoading,
		profileIsLoading,
		articleFavoritePostsIsFetching,
		articleFavoritePostsIsLoading
	])

	useEffect(() => {
		if (
			profileIsError ||
			articleMyPostsError ||
			followError ||
			favoriteError ||
			articleFavoritePostsError
		) {
			getError(err)
		}
	}, [
		profileError,
		profileIsError,
		articleMyPostsError,
		articleMyPostsIsError,
		followIsError,
		followError,
		favoriteIsError,
		favoriteError,
		articleFavoritePostsIsError,
		articleFavoritePostsError
	])

	return {
		activeTab,
		setActiveTabs,
		isPaginationMyPostLoading,
		totalCountMyPosts,
		articleMyPosts,
		articleFavoritePosts,
		user,
		follow,
		favorite,
		isLoading,
		isPaginationFavoritePostLoading
	}
}
