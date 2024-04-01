import UpcomingPayments from '@components/Cards/UpcomingPayments'
import NetTotalChart from '@components/Cards/NetTotalChart'
import PaymentsCalendar from '@components/Cards/PaymentsCalendar'
import PayoffTimeline from '@components/Cards/PayoffTimeline'

const Dashboard = (): JSX.Element => {
  return (
    <>
      <div className="w-full h-full p-1 space-y-1 overflow-auto bg-amber-100 content-start">
        {/*  */}

        <div className="w-full grid grid-cols-4 gap-1">
          <UpcomingPayments filteredIds={[]} />
          <PayoffTimeline filteredIds={[]} />
        </div>

        <div className="w-full grid grid-cols-4 gap-1">
          <PaymentsCalendar filteredIds={[]} />
          <NetTotalChart filteredIds={[]} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
