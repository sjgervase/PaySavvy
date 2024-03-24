import { isAfter, isEqual } from 'date-fns'
import { LoanDatum, HistoricPaymentDatum, UpcomingPaymentDatum } from 'storeTypes'
import { getAdditionFunc, getDateFromFormat } from './dates'

//
//
//
//
//
//
//

// parse historic payments
export const parseHistoricPayments = (loan: LoanDatum): HistoricPaymentDatum[] =>
  loan.paymentHistory.map((p) => ({
    id: loan.id,
    name: loan.name,
    color: loan.color,
    date: getDateFromFormat(p.date),
    amount: p.amount,
    principal: p.principal,
    interest: p.interest
  }))

// get upcoming payments by initial date and interval
export const getUpcomingPayments = (loan: LoanDatum): UpcomingPaymentDatum[] => {
  // get dates
  const initial = getDateFromFormat(loan.startDate)
  // get callback func by intervalType
  const additionFunc = getAdditionFunc(loan.payment.intervalType)

  const dates = [...Array(loan.payment.totalCount).keys()]
    .map((i) => additionFunc(initial, i + 1)) // add 1 for payments after start date
    .filter((date) => isAfter(date, new Date()) || isEqual(date, new Date()))

  return dates.map((d) => ({
    id: loan.id,
    name: loan.name,
    color: loan.color,
    date: d,
    amount: loan.payment.amount
  }))
}
