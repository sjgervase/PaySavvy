import { configureStore } from '@reduxjs/toolkit'
import loansReducer from './loansSlice'

const store = configureStore({
  reducer: {
    loanData: loansReducer
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
