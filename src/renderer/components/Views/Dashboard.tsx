import PieChart from '@components/Charts/PieChart'
import PaymentsCalendar from '@components/Widgets/PaymentsCalendar'
import UpcomingPayments from '@components/Widgets/UpcomingPayments'

import { selectAllLoans } from '@context/loansSlice'
import { useSelector } from 'react-redux'

import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'

import { getHistoricPayments, getUpcomingPayments } from '@utils/utils'
import { addWeeks, isBefore } from 'date-fns'

const Dashboard = (): JSX.Element => {
  const loans = useSelector(selectAllLoans).loans

  const pieData = loans.map((loan) => ({
    id: loan.id,
    color: loan.color,
    amount: loan.remainingAmount,
    name: loan.name
  }))

  const upcomingPaymentsData = loans.reduce(
    (acc, loan) => ({
      ...acc,
      [loan.id]: [...getUpcomingPayments(loan), ...getHistoricPayments(loan)]
    }),
    {}
  )

  const dueThisWeekData = loans.map((loan) => {
    const aWeek = addWeeks(new Date(), 1)
    const payments = getUpcomingPayments(loan).filter((p) => isBefore(p, aWeek))

    return {
      id: loan.id,
      color: loan.color,
      amount: loan.payment.amount,
      name: loan.name,
      payments
    }
  })

  return (
    <>
      <h1 className="p-6">Dashboard</h1>

      <div className="flex flex-row flex-wrap">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>The Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <PieChart data={pieData} />
          </CardContent>
        </Card>

        <Card className="w-fit">
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentsCalendar data={upcomingPaymentsData} />
          </CardContent>
        </Card>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Due This Week</CardTitle>
          </CardHeader>
          <CardContent className="h-96">
            <UpcomingPayments data={dueThisWeekData} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Dashboard
