import { configureStore } from '@reduxjs/toolkit'
import loansReducer from './loansSlice'
import repaymentReducer from './repaymentSlice'

const store = configureStore({
  reducer: {
    loanData: loansReducer,
    repaymentData: repaymentReducer
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
