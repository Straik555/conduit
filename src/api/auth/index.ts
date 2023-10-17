import { authBaseApiSlice } from '../index'
import { UserTypeProps, UserTypeResponse } from './types'

export const authApi = authBaseApiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: build => ({
		signUp: build.mutation<UserTypeResponse, UserTypeProps>({
			query: user => ({
				url: '/users',
				method: 'POST',
				body: {
					user
				}
			})
		}),
		signIn: build.mutation<UserTypeResponse, Omit<UserTypeProps, 'username'>>({
			query: user => ({
				url: '/users/login',
				method: 'POST',
				body: {
					user
				}
			})
		})
	})
})

export const { useSignUpMutation, useSignInMutation } = authApi
