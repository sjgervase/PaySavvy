import { useRef, useState } from 'react'
import { Button, useDayRender } from 'react-day-picker'
import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'
import { Popover, PopoverContent, PopoverTrigger } from '@components/Common/popover'
import { Calendar } from '@components/Common/calendar'
import { cn } from '@utils/tw'
import { Circle } from 'lucide-react'
import { addMonths, formatDate, getDate, isEqual, subMonths } from 'date-fns'
import { numberToCurrency } from '@utils/formatters'
import CardActionBlock from './CardAccessories/CardActionBlock'
import { useSelector } from 'react-redux'
import { LastMonthBadge, NextMonthBadge } from './CardAccessories/ActionBadges'
import { selectPaymentsByIds } from '@store/repaymentSlice'
import { CardProps, CustomDayProps } from '@localTypes/cards'

const CustomDay = ({
  displayMonth,
  date,
  identifiers,
  getPaymentAmountAtDate,
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
  const loansToday = identifiers.filter((el) => loanIdsForDay.includes(el.id))

  // create button
  return (
    <Popover defaultOpen={false} open={dayRender.activeModifiers.selected}>
      <PopoverTrigger asChild>
        <Button
          {...dayRender.buttonProps}
          ref={buttonRef}
          className={cn([dayRender.buttonProps.className, 'flex-col place-content-center'])}
          onClick={() => {}} // empty onclick needed for popover?
        >
          <span className="pt-1.5">{getDate(date)}</span>
          <div className="flex flex-row justify-center gap-x-0.5">
            {loansToday.map((loan) => (
              <Circle
                key={loan.id}
                fill={loan.color}
                className="size-1.5 mx-0"
                strokeWidth={1}
                stroke={loan.color}
              />
            ))}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent onEscapeKeyDown={clearSelection} className="border-amber-500 box-content p-5">
        {loansToday.map((loan) => (
          <p key={loan.id} className="flex items-center cursor-pointer">
            <Circle
              fill={loan.color}
              strokeWidth={1}
              stroke={loan.color}
              className="size-2 mt-[4px]"
            />
            <span className="ml-1 pr-2">{loan.name}:</span>
            <span className="font-normal font-mono">
              {numberToCurrency(getPaymentAmountAtDate(loan.id, date), true)}
            </span>
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
  type Initial = {
    identifiers: Array<{ id: string; color: string; name: string }>
    allPayments: object
  }
  const initial: Initial = { identifiers: [], allPayments: [] }

  const repaymentData = useSelector(selectPaymentsByIds(filteredIds))

  const { identifiers, allPayments } = repaymentData.reduce(
    (acc, datum) => ({
      identifiers: [...acc.identifiers, { id: datum.id, color: datum.color, name: datum.name }],
      allPayments: {
        ...acc.allPayments,
        [datum.id]: [...datum.historicPayments, ...datum.upcomingPayments].map((p) => p.date)
      }
    }),
    initial
  )

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

  const getPaymentAmountAtDate = (loanId: string, queryDate: Date): number => {
    const { historicPayments, upcomingPayments } = repaymentData.find((el) => el.id === loanId) ?? {
      upcomingPayments: [{ date: queryDate, amount: 0 }],
      historicPayments: [{ date: queryDate, amount: 0 }]
    }
    return (
      [...historicPayments, ...upcomingPayments].find((p) => isEqual(p.date, queryDate))?.amount ||
      0
    )
  }

  console.log(allPayments)

  return (
    <Card className="h-full" onClick={clearSelection}>
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
            Day: (props) =>
              CustomDay({
                ...props,
                identifiers,
                getPaymentAmountAtDate,
                clearSelection
              }),
            Caption: () => <></>
          }}
          numberOfMonths={1}
          month={selectedMonth}
          className="p-0 flex justify-center"
          showOutsideDays={false}
          onSelect={(date) => handleSelect(date)}
          selected={selectedDay}
          mode="single"
          modifiers={{ ...allPayments }}
          modifiersClassNames={{ today: 'bg-amber-300 hover:bg-amber-400' }}
        />
      </CardContent>
    </Card>
  )
}
export default PaymentsCalendar
