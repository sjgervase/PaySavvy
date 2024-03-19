declare module 'loanTypes' {
  interface Loan {
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
    paymentHistory: HistoricPayment[]
  }

  type HistoricPayment = { date: string; amount: number; principal: number; interest: number }

  type LoanDataState = { loans: Loan[] }
}
