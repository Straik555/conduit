import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import env from '../utils/env'
import { RootState } from '../store'
import { UserType } from './auth/types'

export const prepareHeaders = (headers: Headers, authState: UserType) => {
	const { token } = authState
	if (token) {
		headers.set('authorization', `Token ${token}`)
	}
}

export const baseApiSlice = createApi({
	reducerPath: 'baseApiConduit',
	baseQuery: fetchBaseQuery({
		baseUrl: env.APP_SERVER
	}),
	endpoints: () => ({}),
	refetchOnMountOrArgChange: 30
})

export const authBaseApiSlice = createApi({
	reducerPath: 'authApiConduit',
	baseQuery: fetchBaseQuery({
		baseUrl: env.APP_SERVER,
		prepareHeaders: (headers, { getState }) => {
			prepareHeaders(headers, (getState() as RootState).authReducer)
			return headers
		}
	}),
	endpoints: () => ({}),
	refetchOnMountOrArgChange: false
})
