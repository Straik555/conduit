import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice/authSlice'
import articleReducer from './articleSlice/articleSlice'
import { authBaseApiSlice, baseApiSlice } from '../api'

const rootReducer = combineReducers({
	authReducer,
	articleReducer,
	[baseApiSlice.reducerPath]: baseApiSlice.reducer,
	[authBaseApiSlice.reducerPath]: authBaseApiSlice.reducer
})

const persistConfig = {
	key: 'conduitMy',
	storage,
	blacklist: ['authApiConduit']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const setupStore = () => {
	return configureStore({
		reducer: persistedReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
				}
			}).concat(baseApiSlice.middleware, authBaseApiSlice.middleware)
	})
}

export const store = setupStore()

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
