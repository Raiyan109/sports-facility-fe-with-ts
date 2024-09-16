import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from '../redux/features/auth/authSlice'

const persistConfig = {
    key: 'auth', // this is the name of what you are going to persist, here I am going to persist auth
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(baseApi.middleware)
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store) // this store is our store