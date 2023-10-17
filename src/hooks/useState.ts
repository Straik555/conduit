import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => useAppSelector(state => state.authReducer)
export const useArticle = () => useAppSelector(state => state.articleReducer)
