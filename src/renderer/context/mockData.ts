export const mockLoanData = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Test Loan',
    color: '6A55BE',
    status: 'ACTIVE',
    totalAmount: 36000,
    remainingAmount: 33921.98,
    currency: 'USD',
    interestRate: 2.5,
    lender: 'The Bank',
    startDate: '13-01-2024', // DD-MM-YYYY
    notes: 'mock note for Test Loan',
    payment: {
      amount: 1039.01,
      totalCount: 36,
      remainingCount: 34,
      intervalType: 'MONTHLY'
    },
    paymentHistory: [
      // get future payment principal + interest amounts https://www.calculator.net/loan-calculator.html?cloanamount=36%2C000&cloanterm=&cloantermmonth=36&cinterestrate=2.5&ccompound=monthly&cpayback=month&x=Calculate&type=1#monthlyfixedr
      {
        date: '13-02-2024',
        amount: 1039.01,
        principal: 964.01,
        interest: 75.0
      },
      {
        date: '13-03-2024',
        amount: 1039.01,
        principal: 966.02,
        interest: 72.99
      }
    ]
  },

  {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Test Loan 2',
    color: '9D7E8E',
    status: 'ACTIVE',
    totalAmount: 2000,
    remainingAmount: 1000,
    currency: 'USD',
    interestRate: 5,
    lender: 'The Other Bank',
    startDate: '01-05-2023', // DD-MM-YYYY
    notes: 'mock note for Test Loan 2',
    payment: {
      amount: 106.07,
      totalCount: 120,
      remainingCount: 108,
      intervalType: 'MONTHLY'
    },
    paymentHistory: [
      // get future payment principal + interest amounts https://www.calculator.net/loan-calculator.html?cloanamount=36%2C000&cloanterm=&cloantermmonth=36&cinterestrate=2.5&ccompound=monthly&cpayback=month&x=Calculate&type=1#monthlyfixedr
      {
        date: '01-06-2023',
        amount: 106.07,
        principal: 64.4,
        interest: 41.67
      },
      {
        date: '01-07-2023',
        amount: 106.07,
        principal: 64.67,
        interest: 41.4
      },
      {
        date: '01-08-2023',
        amount: 106.07,
        principal: 64.94,
        interest: 41.13
      },
      {
        date: '01-09-2023',
        amount: 106.07,
        principal: 65.21,
        interest: 40.86
      },
      {
        date: '01-10-2023',
        amount: 106.07,
        principal: 65.48,
        interest: 40.59
      },
      {
        date: '01-11-2023',
        amount: 106.07,
        principal: 65.75,
        interest: 40.31
      },
      {
        date: '01-12-2023',
        amount: 106.07,
        principal: 66.03,
        interest: 40.04
      },
      {
        date: '01-01-2024',
        amount: 106.07,
        principal: 66.3,
        interest: 39.76
      },
      {
        date: '01-02-2024',
        amount: 106.07,
        principal: 66.58,
        interest: 39.49
      },
      {
        date: '01-03-2024',
        amount: 106.07,
        principal: 66.85,
        interest: 39.21
      }
    ]
  }
]
