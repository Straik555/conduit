import { UserType } from '../auth/types'

export type ArticlesTypesResponse = {
	articles: ArticleTypes[]
	articlesCount: number
}

export type ArticlesTypesProps = {
	limit: number
	offset: number
}

export type ArticlesAuthorTypesProps = {
	author: string
} & ArticlesTypesProps

export type PropsArticleTypeResponse = {
	page: number
} & ArticlesTypesResponse

export const enum ProfileApiTypes {
	Profile = 'profile',
	ArticleProfile = 'articleProfile',
	Articles = 'articles',
	ArticlesYour = 'articlesYour',
	ArticlesAuthor = 'articlesAuthor',
	ArticlesAuthorFavorite = 'articlesAuthorFavorite',
	ArticlesComments = 'articlesComments'
}

export type ProfileTypeResponse = {
	profile: Omit<UserType, 'token' | 'email'>
}

export type ProfileTypeProps = Pick<UserType, 'username'>

export type FollowUserTypeProps = {
	method?: Method
} & ProfileTypeProps

export type FavoriteArticleTypeProps = {
	method?: Method
} & ArticlePostTypesProps

export enum Method {
	POST = 'POST',
	DELETE = 'DELETE'
}

export type ProfileArticleTypeProps = {
	author: string
} & ArticlesTypesProps

export type ProfileArticleFavoriteTypeProps = {
	favorited: string
} & ArticlesTypesProps

export type ArticlePostTypesResponse = {
	article: ArticleTypes
}

export type ArticlePostTypesProps = {
	slug: string
}

export type ArticleTypes = {
	author: {
		following: boolean
	} & Omit<UserType, 'token' | 'email'>
	body: string
	createdAt: string
	description: string
	favorited: boolean
	favoritesCount: number
	tagList: string[]
	title: string
	updatedAt: string
} & ArticlePostTypesProps

export type ArticleCommentsTypesCreate = {
	comment: Pick<ArticleTypes, 'body'>
}

export type ArticleCommentsTypesResponse = {
	comments: CommentsType[]
}

type CommentsType = {
	id: number
} & Pick<ArticleTypes, 'author' | 'body' | 'createdAt' | 'updatedAt'>

export type ArticleCommentDeleteType = ArticlePostTypesProps &
	Pick<CommentsType, 'id'>
