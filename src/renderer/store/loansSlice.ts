import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mockLoanData } from './mockData'
import { RootState } from './store'
import { HistoricPaymentDatum, LoanDatum, UpcomingPaymentDatum } from 'storeTypes'
import { getUpcomingPayments, parseHistoricPayments } from '@utils/parse'

// const initialState_OLD: LoanDataState = { loans: mockLoanData }

// TODO: utilize stored data
const MOCK_RESPONSE: LoanDatum[] = mockLoanData

type LoanDataState = {
  loans: LoanDatum[]
  historicPayments: HistoricPaymentDatum[]
  upcomingPayments: UpcomingPaymentDatum[]
}

const createInitialState = (responseData: LoanDatum[]): LoanDataState =>
  responseData
    .map((loan) => ({ ...loan, color: `#${loan.color}` }))
    .reduce(
      (acc: LoanDataState, loan: LoanDatum) => ({
        loans: [...acc.loans, loan],
        historicPayments: [...acc.historicPayments, ...parseHistoricPayments(loan)],
        upcomingPayments: [...acc.upcomingPayments, ...getUpcomingPayments(loan)]
      }),
      { loans: [], historicPayments: [], upcomingPayments: [] }
    )

export const loansSlice = createSlice({
  name: 'loanData',
  initialState: createInitialState(MOCK_RESPONSE),
  reducers: {
    insertLoan: (state, action: PayloadAction<LoanDatum>) => {
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

export const selectLoansByIds =
  (ids: string[]) =>
  (state: RootState): LoanDatum[] =>
    state.loanData.loans.filter((el) => !ids.includes(el.id))

// get all payment history data excluding ids
export const selectHistoricPaymentsByIds =
  (ids: string[]) =>
  (state: RootState): HistoricPaymentDatum[] =>
    state.loanData.historicPayments.filter((el) => !ids.includes(el.id))

// get all upcoming payment data excluding ids
export const selectUpcomingPaymentsByIds =
  (ids: string[]) =>
  (state: RootState): UpcomingPaymentDatum[] =>
    state.loanData.upcomingPayments.filter((el) => !ids.includes(el.id))

//
//
//
export default loansSlice.reducer
