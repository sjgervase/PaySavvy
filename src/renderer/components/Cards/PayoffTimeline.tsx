import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'

import { useSelector } from 'react-redux'
import { formatISO, isSameMonth, parseISO, setDate } from 'date-fns'

import BrushChartStacked from '@components/Charts/BrushStackedArea'

import CardActionBlock from './CardAccessories/CardActionBlock'
import { selectPaymentsByIds } from '@store/repaymentSlice'
import { CardProps } from '@localTypes/cards'

const PayoffTimeline = ({ filteredIds }: CardProps): JSX.Element => {
  type Initial = {
    identifiers: Array<{ id: string; color: string; name: string }>
    allPayments: Array<{ id: string; date: string; amount: number }>
  }

  const initial: Initial = { identifiers: [], allPayments: [] }

  const { identifiers, allPayments } = useSelector(selectPaymentsByIds(filteredIds)).reduce(
    (acc, datum) => {
      const identifier = { id: datum.id, color: datum.color, name: datum.name }

      const total = datum.upcomingPayments.reduce((sum, payment) => sum + payment.amount * 100, 0)

      // If loan payment was made this month, add additional filler for graphing
      const adjusted = !isSameMonth(datum.upcomingPayments[0].date, new Date())
        ? [{ date: setDate(new Date(), 28), principal: 0, interest: 0, amount: 0 }].concat(
            datum.upcomingPayments
          )
        : datum.upcomingPayments

      return {
        identifiers: [...acc.identifiers, identifier],
        allPayments: [
          ...acc.allPayments,
          ...adjusted.reduce(
            (accPayments, payment, index) => [
              ...accPayments,
              {
                id: datum.id,
                date: formatISO(setDate(payment.date, 28), { representation: 'date' }),
                amount: accPayments[index].amount - payment.amount * 100
              }
            ],
            [
              {
                id: datum.id,
                date: formatISO(setDate(new Date(), 1), { representation: 'date' }),
                amount: total
              }
            ]
          )
        ]
      }
    },
    initial
  )

  const nilVal = identifiers.reduce((obj, i) => ({ ...obj, [i.id]: 0 }), {})

  const merged: Array<{ date: string }> = Object.values(
    allPayments.reduce((acc, datum) => {
      // nullish coalescing op by current date
      acc[datum.date] ??= { date: datum.date, ...nilVal }
      // combine obj, including default value of 0 if a loan has no payment on that date
      acc[datum.date] = { ...acc[datum.date], [datum.id]: datum.amount / 100 }
      return acc
    }, {})
  )

  const dataPoints = merged.map((datum) => ({ ...datum, date: parseISO(datum.date) }))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Payoff Timeline</CardTitle>
        <CardActionBlock leftNode={'TODO'} centerNode={'TODO'} rightNode={'TODO'} />
      </CardHeader>

      <CardContent className="w-full aspect-3/1">
        <BrushChartStacked data={dataPoints} identifiers={identifiers} />
      </CardContent>
    </Card>
  )
}

export default PayoffTimeline
