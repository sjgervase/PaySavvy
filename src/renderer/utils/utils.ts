import { addMonths, addQuarters, addWeeks, addYears, isAfter, isEqual } from 'date-fns'
import { Loan } from 'loanTypes'

//
//
//
export const numberToCurrency = (total: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(total)

//
//

const getDateFromFormat = (dateString: string): Date => {
  const d = dateString.split('-').map((a) => Number(a))
  return new Date(d[2], d[1], d[0])
}

type AdderReturnType = typeof addWeeks | typeof addMonths | typeof addQuarters | typeof addYears
const getAdditionFunc = (intervalType: string): AdderReturnType => {
  switch (intervalType) {
    case 'WEEKLY':
      return addWeeks
    case 'MONTHLY':
      return addMonths
    case 'QUARTERLY':
      return addQuarters
    case 'YEARLY':
      return addYears
    default:
      return addMonths
  }
}

export const getUpcomingPayments = (loan: Loan): Date[] => {
  // get dates
  const initial = getDateFromFormat(loan.startDate)
  const today = new Date()
  // get callback func by intervalType
  const adder = getAdditionFunc(loan.payment.intervalType)

  return (
    [...Array(loan.payment.totalCount).keys()]
      // add 1 for payments after start date
      .map((i) => adder(initial, i + 1))
      .filter((date) => isAfter(date, today) || isEqual(date, today))
  )
}

export const getHistoricPayments = (loan: Loan): Date[] =>
  loan.paymentHistory.map((payment) => getDateFromFormat(payment.date))
