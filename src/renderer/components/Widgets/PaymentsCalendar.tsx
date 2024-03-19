import { useState } from 'react'
import { DayContent, DayContentProps } from 'react-day-picker'
import { Circle } from 'lucide-react'
import { useSelector } from 'react-redux'
import { formatDate } from 'date-fns'

import { Calendar } from '@components/Common/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/Common/popover'
import { numberToCurrency } from '@utils/utils'
import { selectLoansByIds } from '@context/loansSlice'

import { PaymentsCalendarProps } from 'paymentsCalendarTypes'

interface DayContentWithModsProps extends DayContentProps {
  mods: string[]
}
const DayContentWithMods = (props: DayContentWithModsProps): JSX.Element => {
  const loansThisDay = useSelector(selectLoansByIds(props.mods)).map((l) => ({
    name: l.name,
    id: l.id,
    color: l.color,
    amount: l.payment.amount
  }))

  const [isOpen, setIsOpen] = useState(false)
  const reveal = (): void => {
    setIsOpen(true)
  }
  const hide = (): void => {
    setIsOpen(false)
  }

  return (
    <div onMouseOver={reveal} onMouseOut={hide}>
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-col">
            {formatDate(props.date, 'd')}
            <div className="flex justify-center text-center">
              {loansThisDay.map((l) => (
                <Circle key={l.id} fill={`#${l.color}`} className="size-1.5 ml-[0px]" />
              ))}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          {loansThisDay.map((l) => (
            <p key={l.id} className="flex items-center cursor-pointer">
              <Circle fill={`#${l.color}`} className="size-2 mt-[4px]" />
              <span className="ml-1 pr-2">{l.name}:</span>
              <span className="font-normal font-mono">{numberToCurrency(l.amount)}</span>
            </p>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}

const DayContentWrapper = (props: DayContentProps): JSX.Element => {
  const mods = Object.keys(props.activeModifiers).filter((el) => el !== 'today')
  return mods.length === 0 ? (
    <DayContent {...props} />
  ) : (
    <DayContentWithMods {...props} mods={mods} />
  )
}

// TODO: Handle of historic payments
const PaymentsCalendar = ({ data }: PaymentsCalendarProps): JSX.Element => (
  <Calendar
    mode="single"
    numberOfMonths={2}
    showOutsideDays={false}
    onMonthChange={(m) => console.log(m)}
    modifiers={{ ...data }}
    modifiersClassNames={{ today: 'bg-amber-300' }}
    components={{ DayContent: DayContentWrapper }}
  />
)

export default PaymentsCalendar
