import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mockLoanData } from './mockData'
import { RootState } from './store'
import { getUpcomingPayments } from '@utils/parse'
import { RepaymentSliceDatum, RepaymentSliceAction, LoanDatum } from '@localTypes/store'
import { getDateFromFormat } from '@utils/dates'

// TODO: utilize stored data
const MOCK_RESPONSE: LoanDatum[] = mockLoanData

const createInitialState = (responseData: LoanDatum[]): RepaymentSliceDatum[] =>
  responseData.map((loan) => ({
    id: loan.id,
    name: loan.name,
    color: `#${loan.color}`,
    historicPayments: loan.paymentHistory.map((d) => ({ ...d, date: getDateFromFormat(d.date) })),
    upcomingPayments: getUpcomingPayments(loan)
  }))

export const paymentsSlice = createSlice({
  name: 'paymentsData',
  initialState: createInitialState(MOCK_RESPONSE),
  reducers: {
    insertPayment: (state, action: PayloadAction<RepaymentSliceAction>) => {
      state.map((d) =>
        d.id !== action.payload.id
          ? d
          : {
              ...d,
              historicPayments: [
                ...d.historicPayments,
                {
                  date: action.payload.date,
                  principal: 0,
                  interest: 0,
                  amount: action.payload.amount
                }
              ]
            }
      )
    }
  }
})

export const { insertPayment } = paymentsSlice.actions

// SELECTORS
// get all loan data
export const selectAllPayments = (state: RootState): RepaymentSliceDatum[] => state.repaymentData

export const selectPaymentsByIds =
  (ids: string[]) =>
  (state: RootState): RepaymentSliceDatum[] =>
    state.repaymentData.filter((el) => !ids.includes(el.id))

export default paymentsSlice.reducer
