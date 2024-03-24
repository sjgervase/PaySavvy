declare module 'storeTypes' {
  type LoanDatum = {
    id: string
    name: string
    color: string
    status: string
    totalAmount: number
    remainingAmount: number
    currency: string
    interestRate: number
    lender: string
    startDate: string
    notes: string
    payment: {
      amount: number
      totalCount: number
      remainingCount: number
      intervalType: string
    }
    paymentHistory: Array<{
      date: string
      amount: number
      principal: number
      interest: number
    }>
  }

  interface HistoricPaymentDatum {
    id: string
    name: string
    color: string
    date: Date
    amount: number
    principal: number
    interest: number
  }

  interface UpcomingPaymentDatum {
    id: string
    name: string
    color: string
    date: Date
    amount: number
  }

  interface LoanBasicFields {
    id: string
    name: string
    color: string
    amount: number
  }
}
