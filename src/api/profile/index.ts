import { authBaseApiSlice } from '../index'
import {
	ArticleCommentDeleteType,
	ArticleCommentsTypesResponse,
	ArticlePostTypesResponse,
	ArticlesAuthorTypesProps,
	ArticlesTypesProps,
	ArticlesTypesResponse,
	FavoriteArticleTypeProps,
	FollowUserTypeProps,
	Method,
	ProfileApiTypes,
	ProfileArticleFavoriteTypeProps,
	ProfileArticleTypeProps,
	ProfileTypeProps,
	ProfileTypeResponse,
	PropsArticleTypeResponse
} from './types'

const ProfileApiTagTypes = [
	ProfileApiTypes.Profile,
	ProfileApiTypes.ArticleProfile,
	ProfileApiTypes.Articles,
	ProfileApiTypes.ArticlesYour
]

const enhancedBaseApiSlice = authBaseApiSlice.enhanceEndpoints({
	addTagTypes: ProfileApiTagTypes
})

const profileApi = enhancedBaseApiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: build => ({
		getAllGlobalArticles: build.query<
			ArticlesTypesResponse,
			ArticlesTypesProps
		>({
			query: ({ limit, offset }) => ({
				url: '/articles',
				method: 'GET',
				params: {
					limit,
					offset
				}
			}),
			providesTags: [ProfileApiTypes.Articles]
		}),
		getAllYourArticles: build.query<ArticlesTypesResponse, ArticlesTypesProps>({
			query: ({ limit, offset }) => ({
				url: '/articles/feed',
				method: 'GET',
				params: {
					limit,
					offset
				}
			}),
			providesTags: [ProfileApiTypes.ArticlesYour]
		}),
		getAllArticlesAuthor: build.query<
			ArticlesTypesResponse,
			ArticlesAuthorTypesProps
		>({
			query: ({ limit, offset, author }) => ({
				url: '/articles',
				method: 'GET',
				params: {
					author,
					limit,
					offset
				}
			}),
			providesTags: [ProfileApiTypes.ArticlesAuthor]
		}),
		getAllArticlesFavorites: build.query<
			ArticlesTypesResponse,
			ProfileArticleFavoriteTypeProps
		>({
			query: ({ limit, offset, favorited }) => ({
				url: '/articles',
				method: 'GET',
				params: {
					favorited,
					limit,
					offset
				}
			}),
			providesTags: [ProfileApiTypes.ArticlesAuthorFavorite]
		}),
		getArticlePost: build.query<ArticlePostTypesResponse, string>({
			query: slug => ({
				url: `/articles/${slug}`,
				method: 'GET'
			}),
			providesTags: [ProfileApiTypes.Articles, ProfileApiTypes.ArticleProfile]
		}),
		getProfile: build.query<ProfileTypeResponse, ProfileTypeProps>({
			query: ({ username }) => ({
				url: `/profiles/${username}`,
				method: 'GET'
			}),
			providesTags: [ProfileApiTypes.Profile]
		}),
		getArticleProfile: build.query<
			PropsArticleTypeResponse,
			ProfileArticleTypeProps
		>({
			query: ({ author, limit, offset }) => ({
				url: '/articles',
				method: 'GET',
				params: {
					author,
					limit,
					offset
				}
			}),
			transformResponse: (response: PropsArticleTypeResponse, meta, arg) => {
				return {
					...response,
					page: arg.offset / 10
				}
			},
			providesTags: [ProfileApiTypes.ArticleProfile]
		}),
		followUser: build.mutation<ProfileTypeResponse, FollowUserTypeProps>({
			query: ({ username, method = Method.POST }) => ({
				url: `/profiles/${username}/follow`,
				method
			}),
			invalidatesTags: [
				ProfileApiTypes.Profile,
				ProfileApiTypes.Articles,
				ProfileApiTypes.ArticleProfile
			]
		}),
		favoriteArticle: build.mutation<
			ArticlePostTypesResponse,
			FavoriteArticleTypeProps
		>({
			query: ({ slug, method }) => ({
				url: `/articles/${slug}/favorite`,
				method
			}),
			invalidatesTags: [
				ProfileApiTypes.Profile,
				ProfileApiTypes.Articles,
				ProfileApiTypes.ArticleProfile
			]
		}),
		getComments: build.query<ArticleCommentsTypesResponse, string>({
			query: slug => ({
				url: `/articles/${slug}/comments`,
				method: 'GET'
			}),
			providesTags: [ProfileApiTypes.ArticlesComments]
		}),
		addComment: build.mutation<any, any>({
			query: () => ({
				url: '',
				method: 'POST'
			})
		}),
		deleteComment: build.mutation<
			ArticleCommentsTypesResponse,
			ArticleCommentDeleteType
		>({
			query: ({ slug, id }) => ({
				url: `/articles/${slug}/comments/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: [ProfileApiTypes.ArticlesComments]
		})
	})
})

export const {
	useGetProfileQuery,
	useGetArticleProfileQuery,
	useGetAllYourArticlesQuery,
	useFollowUserMutation,
	useFavoriteArticleMutation,
	useGetAllGlobalArticlesQuery,
	useGetArticlePostQuery,
	useGetAllArticlesFavoritesQuery,
	useGetCommentsQuery,
	useDeleteCommentMutation
} = profileApi
