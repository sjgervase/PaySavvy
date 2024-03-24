//
//
//
//

// return percentage value from number and total **TO ONE DECIMAL PLACE**
export const getPercentage = (amount: number, total: number): number =>
  parseFloat(((amount / total) * 100).toFixed(1))
