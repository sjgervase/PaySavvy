import { FormControl, FormItem, FormLabel, FormMessage } from '@components/Common/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components/Common/select'

import { SelectInputProps } from 'formInputTypes'

const SelectInput = ({
  label,
  width,
  field,
  options,
  placeholder
}: SelectInputProps): JSX.Element => (
  <FormItem className={`col-span-${width}`}>
    <FormLabel>{label}</FormLabel>
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map(({ value, label }) => (
          <SelectItem key={`${field.name}-${value}`} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <FormMessage />
  </FormItem>
)

export default SelectInput
