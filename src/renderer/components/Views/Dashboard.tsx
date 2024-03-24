import UpcomingPayments from '@components/Cards/UpcomingPayments'
import NetTotalChart from '@components/Cards/NetTotalChart'
import PaymentsCalendar from '@components/Cards/PaymentsCalendar'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <h1 className="p-6">Dashboard</h1>

      <div className="flex flex-row flex-wrap">
        <PaymentsCalendar filteredIds={[]} />

        <NetTotalChart filteredIds={[]} />

        <UpcomingPayments filteredIds={[]} />
      </div>
    </>
  )
}

export default Dashboard
