//
//
//
export type LoanDatum = {
  /** The unique id for the loan */
  id: string
  /** The user-entered name of the loan */
  name: string
  /** The user-selected color for the loan, used in charts and accent colors */
  color: string
  /** The current status of the loan */
  status: string
  /** An object consisting of the initial dollar amounts of a loan */
  initialAmounts: {
    /** The initial principal amount of a loan */
    principal: number
    /** The initial interest amount of a loan */
    cumulativeInterest: number
    /** The sum of the initial principal and initial interest of a loan */
    initialTotal: number
  }
  /** An object consisting of the remaining dollar amounts of a loan */
  remainingAmounts: {
    /** The remaining principal amount of a loan */
    principal: number
    /** The remaining interest amount of a loan */
    cumulativeInterest: number
    /** The sum of the remaining principal and remaining interest of a loan */
    remainingTotal: number
  }
  /** An object consisting of data for scheduled payments */
  repaymentData: {
    /** The minimum amount due for every payment  */
    amount: number
    /** The total number of past and future payments due */
    totalCount: number
    /** The remaining number of payments due */
    remainingCount: number
    /** The frequency in which payments are to be submitted */
    intervalType: string
  }
  /** The interest rate for the loan */
  interestRate: number
  /** The name of the lender */
  lender: string
  /** The date the loan contract was signed */
  startDate: string
  /** Any additional user notes */
  notes: string
  /** An object consisting of data relating to a payment */
  paymentHistory: Array<{
    /** The date a payment was made */
    date: string
    /** The amount of principal which was paid at this date */
    principal: number
    /** The amount of interest which was paid at this date */
    interest: number
    /** The sum of the principal and interest at this date */
    amount: number
  }>
}

/** An object consisting of data relating to a payment */
export type PaymentAtDate = {
  /** The date a payment was made */
  date: Date
  /** The amount of principal which was paid at this date */
  principal: number
  /** The amount of interest which was paid at this date */
  interest: number
  /** The sum of the principal and interest at this date */
  amount: number
}

//
//
// LOAN SLICE STORE
//
//
export type LoanSliceDatum = {
  /** The unique id for the loan */
  id: string
  /** The user-entered name of the loan */
  name: string
  /** The user-selected color for the loan, used in charts and accent colors */
  color: string
  /** The current status of the loan */
  status: string
  /** An object consisting of the initial dollar amounts of a loan */
  initialAmounts: {
    /** The initial principal amount of a loan */
    principal: number
    /** The initial interest amount of a loan */
    cumulativeInterest: number
    /** The sum of the initial principal and initial interest of a loan */
    initialTotal: number
  }
  /** An object consisting of the remaining dollar amounts of a loan */
  remainingAmounts: {
    /** The remaining principal amount of a loan */
    principal: number
    /** The remaining interest amount of a loan */
    cumulativeInterest: number
    /** The sum of the remaining principal and remaining interest of a loan */
    remainingTotal: number
  }
  /** The interest rate for the loan */
  interestRate: number
  /** The name of the lender */
  lender: string
  /** The date the loan contract was signed */
  startDate: string
  /** Any additional user notes */
  notes: string
}

//
//
// REPAYMENT SLICE STORE
//
//
/** An object consisting of fields for the Repayment Slice Reducer Actions */
export type RepaymentSliceAction = {
  /** The unique id for the loan */
  id: string
  /** The amount paid at this date */
  amount: number
  /** The date a payment was made */
  date: Date
}

/** An object consisting of fields for a single item in the Repayment Slice Store */
export type RepaymentSliceDatum = {
  /** The unique id for the loan */
  id: string
  /** The user-entered name of the loan */
  name: string
  /** The user-selected color for the loan, used in charts and accent colors */
  color: string
  /** An array of all historic payments recorded */
  historicPayments: PaymentAtDate[]
  /** An array of all upcoming payments, determined by the loan's start date and remaining payments */
  upcomingPayments: PaymentAtDate[]
}
