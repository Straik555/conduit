import { useArticle, useAuth } from '../../hooks/useState'
import {
	useFavoriteArticleMutation,
	useGetAllGlobalArticlesQuery,
	useGetAllYourArticlesQuery
} from '../../api/profile'
import { useGetAllTagQuery } from '../../api/tags'
import { TypeErrorAuth } from '../../api/auth/types'
import { useEffect, useMemo, useState } from 'react'
import { getError } from '../../utils/error'
import { getPageCount } from '../../utils/page'
import { HomeTabs } from './Home.types'

export const useHome = () => {
	const { token } = useAuth()
	const { globalPage, yourPage } = useArticle()
	const [activeTab, setActiveTab] = useState<HomeTabs>(HomeTabs.Global)

	const {
		data: articles,
		isError: articlesIsError,
		isLoading: articlesIsLoading,
		error: articlesError,
		isFetching: articlesIsFetching,
		isSuccess: articlesIsSuccess
	} = useGetAllGlobalArticlesQuery({
		limit: 10,
		offset: globalPage
	})

	const {
		data: articlesYour,
		isError: articlesYourIsError,
		isLoading: articlesYourIsLoading,
		error: articlesYourError,
		isFetching: articlesYourIsFetching,
		isSuccess: articlesYourIsSuccess
	} = useGetAllYourArticlesQuery(
		{
			limit: 10,
			offset: yourPage
		},
		{
			skip: !token
		}
	)

	const {
		data: tags,
		isError: isErrorTags,
		isLoading: isLoadingTags,
		error: errorTags
	} = useGetAllTagQuery(null)
	const [
		favorite,
		{
			isLoading: favoriteIsLoading,
			isError: favoriteIsError,
			error: favoriteError
		}
	] = useFavoriteArticleMutation()

	const err = (articlesError ||
		articlesYourError ||
		errorTags ||
		favoriteError) as TypeErrorAuth

	useEffect(() => {
		if (articlesError || articlesYourError || errorTags || favoriteError) {
			getError(err)
		}
	}, [
		articlesIsError,
		articlesError,
		isErrorTags,
		errorTags,
		favoriteIsError,
		favoriteError,
		articlesYourError,
		articlesYourIsError
	])

	const isLoading: boolean = useMemo(() => {
		return (
			favoriteIsLoading ||
			articlesIsLoading ||
			articlesIsFetching ||
			articlesYourIsLoading ||
			articlesYourIsFetching
		)
	}, [
		favoriteIsLoading,
		articlesIsLoading,
		articlesIsFetching,
		articlesYourIsLoading,
		articlesYourIsFetching
	])

	const isLoadingYour: boolean = useMemo(() => {
		return articlesYourIsLoading || articlesYourIsFetching
	}, [articlesYourIsLoading, articlesYourIsFetching])

	const totalCount = useMemo(() => {
		if (!!articles) {
			return getPageCount(articles.articlesCount, 10)
		}
		return 0
	}, [articles])

	const totalCountYour = useMemo(() => {
		if (!!articlesYour) {
			return getPageCount(articlesYour.articlesCount, 10)
		}
		return 0
	}, [articlesYour])

	const isPaginationEmpty = useMemo(() => {
		return !!articlesIsSuccess && !articlesIsError && !articlesIsFetching
	}, [articlesIsSuccess, articlesIsError, articlesIsFetching])

	const isPaginationYourEmpty = useMemo(() => {
		return (
			!!articlesYourIsSuccess && !articlesYourIsError && !articlesYourIsFetching
		)
	}, [articlesYourIsSuccess, articlesYourIsError, articlesYourIsFetching])

	return {
		tags,
		activeTab,
		setActiveTab,
		totalCount,
		articles,
		articlesYour,
		favorite,
		isLoading,
		isLoadingTags,
		isPaginationEmpty,
		isPaginationYourEmpty,
		totalCountYour,
		isLoadingYour
	}
}
