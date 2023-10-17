import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType, UserTypeResponse } from '../../api/auth/types'
import { authApi } from '../../api/auth'

const initialState: UserType = {
	token: '',
	username: '',
	email: '',
	image: '',
	bio: null,
	following: false
}

export const authSlice = createSlice({
	name: 'authUser',
	initialState,
	reducers: {
		logout(state) {
			state.token = initialState.token
			state.email = initialState.email
			state.username = initialState.username
			state.image = initialState.image
			state.bio = initialState.bio
			state.following = initialState.following
		}
	},
	extraReducers: builder => {
		builder.addMatcher(
			(authApi.endpoints.signUp.matchFulfilled,
			authApi.endpoints.signIn.matchFulfilled),
			(state, { payload }: PayloadAction<UserTypeResponse>) => {
				state.image = payload.user.image
				state.username = payload.user.username
				state.email = payload.user.email
				state.token = payload.user.token
				state.bio = payload.user.bio
				state.following = payload.user.following
			}
		)
	}
})

export const { logout } = authSlice.actions

export default authSlice.reducer
