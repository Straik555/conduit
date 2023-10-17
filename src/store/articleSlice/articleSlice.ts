import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialStateType = {
	yourPage: number
	globalPage: number
	myPosts: number
	favoritePosts: number
}

const initialState: InitialStateType = {
	yourPage: 0,
	globalPage: 0,
	myPosts: 0,
	favoritePosts: 0
}

export const articleSlice = createSlice({
	name: 'articleGlobalAndYour',
	initialState,
	reducers: {
		changePageGlobal(
			state,
			{ payload }: PayloadAction<Pick<InitialStateType, 'globalPage'>>
		) {
			state.globalPage = payload.globalPage
		},
		changePageYour(
			state,
			{ payload }: PayloadAction<Pick<InitialStateType, 'yourPage'>>
		) {
			state.yourPage = payload.yourPage
		},
		changePageMyPost(
			state,
			{ payload }: PayloadAction<Pick<InitialStateType, 'myPosts'>>
		) {
			state.myPosts = payload.myPosts
		},
		changePageFavoritePosts(
			state,
			{ payload }: PayloadAction<Pick<InitialStateType, 'favoritePosts'>>
		) {
			state.favoritePosts = payload.favoritePosts
		}
	}
})

export const {
	changePageGlobal,
	changePageYour,
	changePageMyPost,
	changePageFavoritePosts
} = articleSlice.actions

export default articleSlice.reducer
