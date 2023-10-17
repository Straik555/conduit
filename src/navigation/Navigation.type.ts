import { ReactNode } from 'react'

export type TypeRoute = {
	name: keyof TypeRootStackParamList
	component: ReactNode
	path: string
	isHidden?: boolean
	withoutUser?: boolean
	isUser?: boolean
	icon?: ReactNode
}

export type TypeRootStackParamList = {
	Home: undefined
	Profile: undefined
	'Sign up': {
		isReg: boolean
	}
	'Sign in': {
		isReg: boolean
	}
	Article: undefined
	Settings: undefined
}

export enum ROUTES {
	HOME = '/',
	PROFILE = '/profile/:username',
	SIGN_IN = '/sign-in',
	SIGN_UP = '/sign-up',
	ARTICLE = '/article/:slug',
	SETTINGS = '/settings'
}
