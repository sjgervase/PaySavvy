// General
export const stripNonNum = (val: string): string => val.replace(/\D/g, '')
export const splitAtDecimal = (val: number): string[] => val.toFixed(2).split('.')
