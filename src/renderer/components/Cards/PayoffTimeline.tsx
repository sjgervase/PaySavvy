import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'
import { CardProps } from 'cardPropTypes'

import { useSelector } from 'react-redux'
import { selectUpcomingPaymentsByIds } from '@store/loansSlice'
import { isSameMonth, setDate } from 'date-fns'

import BrushChartStacked from '@components/Charts/BrushStackedArea'

import { UpcomingPaymentDatum } from 'storeTypes'
import CardActionBlock from './CardAccessories/CardActionBlock'

const PayoffTimeline = ({ filteredIds, colSpan }: CardProps): JSX.Element => {
  const upcomingPaymentsData = useSelector(selectUpcomingPaymentsByIds(filteredIds)).map((d) => ({
    ...d,
    amount: d.amount * 100
  }))

  type NetRemainingAtDate = { id: string; amount: number; date: Date }

  const totalsForLoans = upcomingPaymentsData.reduce(
    (acc: { sorted: NetRemainingAtDate[]; unsorted: UpcomingPaymentDatum[] }, datum) => {
      // find all matching payments
      const matching = acc.unsorted.filter((p) => p.id === datum.id)
      // if no matching payments, return
      if (matching.length === 0) return acc
      // get total for all matching payments
      const totalDue = matching.reduce((sum, p) => sum + p.amount, 0)

      return {
        sorted: [
          ...acc.sorted,
          // a data point for today
          { date: new Date(), amount: totalDue / 100, id: datum.id },
          // all data points from loan
          ...matching.map((payment, i) => ({
            id: datum.id,
            date: setDate(payment.date, 15), // better graphing
            amount: (totalDue - (i + 1) * payment.amount) / 100
          }))
        ],
        // payments with a different id
        unsorted: acc.unsorted.filter((p) => p.id !== datum.id)
      }
    },
    // initial obj
    { sorted: [], unsorted: upcomingPaymentsData }
  ).sorted

  // create an object of all ids with a value of 0 to use as the default
  const defaultDataPoint = Array.from([
    ...new Set(upcomingPaymentsData.map((item) => item.id))
  ]).reduce((o, id) => ({ ...o, [id]: 0 }), {})

  const chartData = totalsForLoans.reduce(
    (acc: { merged: object[]; unmerged: NetRemainingAtDate[] }, datum) => {
      // get all dataPoints in the same month and year as current dataPoint
      const matching = acc.unmerged.filter((el) => isSameMonth(datum.date, el.date))
      // if no dates pass filter, return
      if (matching.length === 0) return acc

      return {
        merged: [
          ...acc.merged,
          // merge elements of sameMonthAndYear
          matching.reduce((acc, el) => ({ ...acc, [el.id]: el.amount }), {
            date: datum.date,
            ...defaultDataPoint
          })
        ],
        unmerged: acc.unmerged.filter((el) => !isSameMonth(datum.date, el.date)) // return different months
      }
    },
    // initial
    { merged: [], unmerged: totalsForLoans }
  ).merged

  const identifiers = Object.keys(chartData[0])
    .filter((key) => key !== 'date')
    .map((key) => {
      const match = upcomingPaymentsData.find((el) => el.id === key)
      return { id: key, color: match?.color || '000000', name: match?.name || 'loan' }
    })

  return (
    <Card className="col-span-3 h-full">
      <CardHeader>
        <CardTitle>Payoff Timeline</CardTitle>
        <CardActionBlock leftNode={'TODO'} centerNode={'TODO'} rightNode={'TODO'} />
      </CardHeader>

      <CardContent className="w-full aspect-3/1">
        <BrushChartStacked data={chartData} identifiers={identifiers} />
      </CardContent>
    </Card>
  )
}

export default PayoffTimeline
