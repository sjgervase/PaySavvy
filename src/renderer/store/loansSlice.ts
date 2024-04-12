import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mockLoanData } from './mockData'
import { RootState } from './store'
import { LoanDatum, LoanSliceDatum } from '@localTypes/store'

// TODO: utilize stored data
const MOCK_RESPONSE: LoanDatum[] = mockLoanData

const createInitialState = (responseData: LoanDatum[]): LoanSliceDatum[] =>
  responseData.map((loan) => ({
    id: loan.id,
    name: loan.name,
    color: `#${loan.color}`,
    status: loan.status,
    initialAmounts: loan.initialAmounts,
    remainingAmounts: loan.remainingAmounts,
    interestRate: loan.interestRate,
    lender: loan.lender,
    startDate: loan.startDate,
    notes: loan.notes
  }))

export const loansSlice = createSlice({
  name: 'loanData',
  initialState: createInitialState(MOCK_RESPONSE),
  reducers: {
    insertLoan: (state, action: PayloadAction<LoanDatum>) => {
      state.push(action.payload)
    }
  }
})

export const { insertLoan } = loansSlice.actions

// SELECTORS
// get all loan data
export const selectAllLoans = (state: RootState): LoanSliceDatum[] => state.loanData

// get loans which match array of ids
export const selectLoansByIds =
  (ids: string[]) =>
  (state: RootState): LoanSliceDatum[] =>
    state.loanData.filter((el) => !ids.includes(el.id))

export default loansSlice.reducer
