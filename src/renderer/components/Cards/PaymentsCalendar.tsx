import { useRef, useState } from 'react'
import { CardProps } from 'cardPropTypes'
import { Button, useDayRender } from 'react-day-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'
import { Popover, PopoverContent, PopoverTrigger } from '@components/Common/popover'
import { Calendar } from '@components/Common/calendar'
import { cn } from '@utils/tw'
import { Circle } from 'lucide-react'
import { addMonths, formatDate, getDate, subMonths } from 'date-fns'
import { numberToCurrency } from '@utils/formatters'
import CardActionBlock from './CardAccessories/CardActionBlock'
import { useSelector } from 'react-redux'
import { selectHistoricPaymentsByIds, selectUpcomingPaymentsByIds } from '@store/loansSlice'
import { LastMonthBadge, NextMonthBadge } from './CardAccessories/ActionBadges'
import { LoanBasicFields } from 'storeTypes'
import { CustomDayProps } from 'paymentsCalendarTypes'

type DayIndicatorsProps = { indicators: LoanBasicFields[] }
const DayIndicators = ({ indicators }: DayIndicatorsProps): JSX.Element => {
  if (indicators.length === 1)
    return (
      <Circle
        fill={`#${indicators[0].color}`}
        className="size-1.5"
        strokeWidth={1}
        stroke={`#${indicators[0].color}`}
      />
    )
  return (
    <div className="flex flex-row justify-center w-full">
      {indicators.map((el, i) => (
        <Circle
          key={el.id}
          fill="red"
          className={`size-1.5 ${i === indicators.length - 1 ? '' : 'mr-0.5'}`}
          strokeWidth={1}
          stroke="red"
        />
      ))}
    </div>
  )
}

const CustomDay = ({
  displayMonth,
  date,
  indicatorData,
  clearSelection
}: CustomDayProps): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dayRender = useDayRender(date, displayMonth, buttonRef)
  // if hidden
  if (dayRender.isHidden) return <></>
  // get modifiers
  const loanIdsForDay = Object.keys(dayRender.activeModifiers).filter(
    (m) => m !== 'today' && m !== 'selected'
  )

  // return div if no modifiers
  if (loanIdsForDay.length === 0)
    return (
      <div
        {...dayRender.divProps}
        className={cn([dayRender.divProps.className, 'cursor-default hover:bg-inherit'])}
      />
    )

  // get relevant loan data from ids
  const loanInfo = indicatorData.filter((el) => loanIdsForDay.includes(el.id))

  // create button
  return (
    <Popover defaultOpen={false} open={dayRender.activeModifiers.selected}>
      <PopoverTrigger asChild>
        <Button
          {...dayRender.buttonProps}
          ref={buttonRef}
          className={cn([dayRender.buttonProps.className, 'flex-col'])}
          onClick={() => {}} // empty onclick needed for popover?
        >
          <span className="justify-self-center pt-1.5">{getDate(date)}</span>

          <DayIndicators indicators={loanInfo} />
        </Button>
      </PopoverTrigger>

      <PopoverContent onEscapeKeyDown={clearSelection} className="border-amber-500 box-content p-5">
        {loanInfo.map((el) => (
          <p key={el.id} className="flex items-center cursor-pointer">
            <Circle fill={`#${el.color}`} className="size-2 mt-[4px]" />
            <span className="ml-1 pr-2">{el.name}:</span>
            <span className="font-normal font-mono">{numberToCurrency(el.amount, true)}</span>
          </p>
        ))}
      </PopoverContent>
    </Popover>
  )
}

// Navigation
const FORWARD = 'FORWARD'
const BACKWARD = 'BACKWARD'

const PaymentsCalendar = ({ filteredIds }: CardProps): JSX.Element => {
  // get payment data
  const upcomingPaymentsData = useSelector(selectUpcomingPaymentsByIds(filteredIds))
  const historicPaymentsData = useSelector(selectHistoricPaymentsByIds(filteredIds))

  const calendarData = [...upcomingPaymentsData, ...historicPaymentsData].reduce(
    (acc, d) => ({
      ...acc,
      [d.id]: [...(acc[d.id] || []), d.date]
    }),
    {}
  )

  const indicatorData = Object.keys(calendarData).map((d) => {
    const {
      name = 'unknown',
      color = 'FFFFFF',
      amount = 0
    } = upcomingPaymentsData.find((p) => p.id === d) || {}
    return { id: d, name, color, amount }
  })

  // state
  const [selectedDay, setSelectedDay] = useState()
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const handleSelect = (date): void => {
    setSelectedDay(date)
  }

  const clearSelection = (): void => {
    setSelectedDay(undefined)
  }

  const handleMonthNavigation = (direction): void => {
    setSelectedMonth((prevState) => {
      if (direction === FORWARD) return addMonths(prevState, 1)
      return subMonths(prevState, 1)
    })
  }

  return (
    <Card className="w-fit" onClick={clearSelection}>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>

        <CardActionBlock
          leftNode={
            <LastMonthBadge
              handleClick={() => handleMonthNavigation(BACKWARD)}
              label={formatDate(subMonths(selectedMonth, 1), 'MMM').toUpperCase()}
            />
          }
          centerNode={formatDate(selectedMonth, 'MMM yyyy')}
          rightNode={
            <NextMonthBadge
              handleClick={() => handleMonthNavigation(FORWARD)}
              label={formatDate(addMonths(selectedMonth, 1), 'MMM').toUpperCase()}
            />
          }
        />
      </CardHeader>

      <CardContent>
        <Calendar
          components={{
            Day: (props) => CustomDay({ ...props, indicatorData, clearSelection }),
            Caption: () => <></>
          }}
          numberOfMonths={1}
          month={selectedMonth}
          showOutsideDays={false}
          onSelect={(date) => handleSelect(date)}
          selected={selectedDay}
          mode="single"
          modifiers={{ ...calendarData }}
          modifiersClassNames={{ today: 'bg-amber-300 hover:bg-amber-400' }}
        />
      </CardContent>
    </Card>
  )
}
export default PaymentsCalendar
