export const mockLoanData = [
  {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Test Loan',
    color: '6A55BE',
    status: 'ACTIVE',

    initialAmounts: {
      principal: 36000,
      cumulativeInterest: 1404.34,
      initialTotal: 37404.34
    },

    remainingAmounts: {
      principal: 34069.97,
      cumulativeInterest: 1256.35,
      remainingTotal: 35326.32
    },

    repaymentData: {
      amount: 1039.01,
      totalCount: 36,
      remainingCount: 34,
      intervalType: 'MONTHLY'
    },

    interestRate: 2.5,
    lender: 'The Bank',
    startDate: '13-01-2024',
    notes: 'mock note for Test Loan',
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

    initialAmounts: {
      principal: 10000,
      cumulativeInterest: 2727.86,
      initialTotal: 12727.86
    },

    remainingAmounts: {
      principal: 9343.79,
      cumulativeInterest: 2323.4,
      remainingTotal: 11667.19
    },

    repaymentData: {
      amount: 106.07,
      totalCount: 120,
      remainingCount: 108,
      intervalType: 'MONTHLY'
    },

    interestRate: 2.5,
    lender: 'The Bank',
    startDate: '01-05-2023',
    notes: 'mock note for Test Loan 2',
    paymentHistory: [
      // generate more payments here: https://www.calculator.net/amortization-calculator.html?cloanamount=10%2C000&cloanterm=10&cloantermmonth=0&cinterestrate=5&cstartmonth=4&cstartyear=2024&cexma=0&cexmsm=4&cexmsy=2024&cexya=0&cexysm=4&cexysy=2024&cexoa=0&cexosm=4&cexosy=2024&caot=0&xa1=0&xm1=4&xy1=2024&xa2=0&xm2=4&xy2=2024&xa3=0&xm3=4&xy3=2024&xa4=0&xm4=4&xy4=2024&xa5=0&xm5=4&xy5=2024&xa6=0&xm6=4&xy6=2024&xa7=0&xm7=4&xy7=2024&xa8=0&xm8=4&xy8=2024&xa9=0&xm9=4&xy9=2024&xa10=0&xm10=4&xy10=2024&printit=0&x=Calculate#calresult
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
