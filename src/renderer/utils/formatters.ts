// Format a Number to Currency
export const numberToCurrency = (amount: number, includeCents?: boolean): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: includeCents ? 2 : 0
  }).format(amount)

// Format a Number to a Percent
export const numberToPercent = (amount: number): string => `${amount}%`
