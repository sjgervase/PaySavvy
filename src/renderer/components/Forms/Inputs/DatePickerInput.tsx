import { useMemo, useState } from 'react'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { addMonths, formatDate, getYear, setMonth, setYear, subMonths } from 'date-fns'

import { FormControl, FormItem, FormLabel, FormMessage } from '@components/Common/form'
import { Popover, PopoverTrigger, PopoverContent } from '@components/Common/popover'
import { Calendar } from '@components/Common/calendar'
import { Button } from '@components/Common/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components/Common/select'

import { cn } from '@utils/tw'
import { GeneralInputProps } from 'formInputTypes'

type CalendarCaptionSelectProps = { displayMonth: Date; setDisplayMonth: (arg0: Date) => void }
const CalendarCaptionSelect = ({
  displayMonth,
  setDisplayMonth
}: CalendarCaptionSelectProps): JSX.Element => {
  const currentYear = getYear(new Date())
  const years = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, i) => currentYear - i),
    []
  )

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="mr-2 h-7 aspect-square"
        onClick={() => setDisplayMonth(subMonths(displayMonth, 1))}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Select onValueChange={(val) => setDisplayMonth(setMonth(displayMonth, parseInt(val)))}>
        <SelectTrigger className="h-7">
          <SelectValue placeholder={formatDate(displayMonth, 'LLLL')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0">January</SelectItem>
            <SelectItem value="1">February</SelectItem>
            <SelectItem value="2">March</SelectItem>
            <SelectItem value="3">April</SelectItem>
            <SelectItem value="4">May</SelectItem>
            <SelectItem value="5">June</SelectItem>
            <SelectItem value="6">July</SelectItem>
            <SelectItem value="7">August</SelectItem>
            <SelectItem value="8">September</SelectItem>
            <SelectItem value="9">October</SelectItem>
            <SelectItem value="10">November</SelectItem>
            <SelectItem value="11">December</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(val) => setDisplayMonth(setYear(displayMonth, parseInt(val)))}>
        <SelectTrigger className="h-7 ml-1">
          <SelectValue placeholder={formatDate(displayMonth, 'yyy')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        className="ml-2 h-7 aspect-square"
        onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

const DatePickerInput = ({ label, width, field }: GeneralInputProps): JSX.Element => {
  const [displayMonth, setDisplayMonth] = useState(new Date())

  return (
    <FormItem className={`col-span-${width}`}>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] pl-3 text-left font-normal',
                !field.value && 'text-muted-foreground'
              )}
            >
              {field.value ? formatDate(field.value, 'PPP') : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            month={displayMonth}
            selected={field.value}
            onSelect={field.onChange}
            mode="single"
            fixedWeeks
            initialFocus
            components={{ Caption: () => CalendarCaptionSelect({ displayMonth, setDisplayMonth }) }}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}

export default DatePickerInput
