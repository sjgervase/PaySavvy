import { isAfter, isEqual } from 'date-fns'

import { getAdditionFunc, getDateFromFormat } from './dates'
import { LoanDatum, PaymentAtDate } from '@localTypes/store'

// get upcoming payments by initial date and interval
export const getUpcomingPayments = (loan: LoanDatum): PaymentAtDate[] => {
  // get dates
  const initial = getDateFromFormat(loan.startDate)
  // get callback func by intervalType
  const additionFunc = getAdditionFunc(loan.repaymentData.intervalType)

  // generate array of all payment dates that are in the future
  const dates = [...Array(loan.repaymentData.totalCount).keys()]
    .map((i) => additionFunc(initial, i + 1)) // add 1 for payments after start date
    .filter((date) => isAfter(date, new Date()) || isEqual(date, new Date()))

  return dates.map((d) => ({
    date: d,
    principal: 0,
    interest: 0,
    amount: loan.repaymentData.amount
  }))
}
