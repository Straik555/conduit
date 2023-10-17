import { Article, Auth, Home, Profile, Settings } from '~pages'
import { ROUTES, TypeRoute } from '~navigation/Navigation.type'
import { Edit } from '../assets'

const routesAuth: TypeRoute[] = [
	{
		name: 'Settings',
		path: ROUTES.SETTINGS,
		component: <Settings />,
		icon: <Edit />,
		isUser: true
	},
	{
		name: 'Profile',
		path: ROUTES.PROFILE,
		component: <Profile />,
		isUser: true
	}
]

const routesHome: TypeRoute[] = [
	{
		name: 'Home',
		path: ROUTES.HOME,
		component: <Home />
	},
	{
		name: 'Sign in',
		path: ROUTES.SIGN_IN,
		component: <Auth isReg={false} />,
		withoutUser: true
	},
	{
		name: 'Sign up',
		path: ROUTES.SIGN_UP,
		component: <Auth isReg />,
		withoutUser: true
	},
	{
		name: 'Article',
		path: ROUTES.ARTICLE,
		component: <Article />,
		isHidden: true
	}
]

export const routes: TypeRoute[] = [...routesHome, ...routesAuth]
