import { FormControl, FormItem, FormLabel, FormMessage } from '@components/Common/form'
import { Input } from '@components/Common/input'
import { stripNonNum, splitAtDecimal } from '@utils/utils'
import { GeneralInputProps } from 'formInputTypes'

// Value Change Handlers
const handleDollarChange = (currentValue: number, newDollars: string): number => {
  const dollars = parseInt(stripNonNum(newDollars))
  const cents = parseInt(splitAtDecimal(currentValue)[1]) / 100
  return dollars + cents
}
const handleCentsChange = (currentValue: number, newCents: string): number => {
  const dollars = Math.floor(currentValue)
  const cents = parseInt(stripNonNum(newCents.length === 3 ? newCents.slice(1) : newCents)) / 100
  return dollars + cents
}

// Display Value Handlers
const getDollarDisplayValue = (value: number): string =>
  value === 0 ? '' : new Intl.NumberFormat('en-US').format(Math.floor(value))

const getCentsDisplayValue = (value: number): string => {
  const cents = splitAtDecimal(value)[1]
  return cents === '00' ? '' : cents
}

const CurrencyInput = ({ label, width, field }: GeneralInputProps): JSX.Element => (
  <FormItem className={`col-span-${width}`}>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <div className="flex items-center font-mono">
        <span className="text-xl mr-3">$</span>
        <Input
          {...field}
          onChange={(e) => field.onChange(handleDollarChange(field.value, e.target.value))}
          value={getDollarDisplayValue(field.value)}
          className="text-xl basis-3/4"
          placeholder={field.value > 0 && field.value < 1 ? '0' : '1,000'}
        />
        <span className="self-end">.</span>
        <Input
          {...field}
          onChange={(e) => field.onChange(handleCentsChange(field.value, e.target.value))}
          value={getCentsDisplayValue(field.value)}
          className="basis-1/4"
          maxLength={3}
          placeholder="00"
        />
      </div>
    </FormControl>
    <FormMessage />
  </FormItem>
)

export default CurrencyInput
