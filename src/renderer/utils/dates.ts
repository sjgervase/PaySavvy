import { addMonths, addQuarters, addWeeks, addYears, differenceInDays, isDate } from 'date-fns'

import { AdderReturnType } from 'dates'

// convert to Date from backend format
export const getDateFromFormat = (dateString: string): Date => {
  const d = dateString.split('-').map((a) => Number(a))
  return new Date(d[2], d[1], d[0])
}

// get correct addition function by interval type
export const getAdditionFunc = (intervalType: string): AdderReturnType => {
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

// get days until
export const getDaysUntilDate = (date: Date | string): number =>
  differenceInDays(new Date(), isDate(date) ? date : getDateFromFormat(date))
