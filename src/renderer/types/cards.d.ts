export type CardProps = {
  /** An array of loan ids to be excluded from the component */
  filteredIds: string[]
}

import { DayProps } from 'react-day-picker'
export interface CustomDayProps extends DayProps {
  /** An array of fields for displaying a specific loan on a day */
  identifiers: Array<{ id: string; color: string; name: string }>
  /** A function to determine the payment amount on a day for that loan */
  getPaymentAmountAtDate: (
    /** The id of the loan which the payment is for */
    loanId: string,
    /** The date of the payment */
    queryDate: Date
  ) => number
  /** A function to hide a visible popover element */
  clearSelection: () => void
}
