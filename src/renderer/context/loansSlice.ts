import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mockLoanData } from './mockData'
import { RootState } from './store'

import { Loan, LoanDataState } from 'loanTypes'

const initialState: LoanDataState = { loans: mockLoanData }

export const loansSlice = createSlice({
  name: 'loanData',
  initialState,
  reducers: {
    insertLoan: (state, action: PayloadAction<Loan>) => {
      state.loans.push(action.payload)
    }
  }
})

export const { insertLoan } = loansSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

// SELECTORS
// get all loan data
export const selectAllLoans = (state: RootState): LoanDataState => state.loanData

// get array of loans by ids
export const selectLoansByIds =
  (ids: string[]) =>
  (state: RootState): Loan[] =>
    state.loanData.loans.filter((loan) => ids.includes(loan.id))

export default loansSlice.reducer
