import UpcomingPayments from '@components/Cards/UpcomingPayments'
import NetTotalChart from '@components/Cards/NetTotalChart'
import PaymentsCalendar from '@components/Cards/PaymentsCalendar'
import PayoffTimeline from '@components/Cards/PayoffTimeline'

const Dashboard = (): JSX.Element => {
  // const loans = useSelector(selectAllLoans)
  // const payments = useSelector(selectAllPayments)

  return (
    <>
      <div className="w-full h-full p-1 space-y-1 overflow-auto bg-amber-100 content-start">
        <div className="w-full grid grid-cols-4 gap-1">
          <div className="col-span-1">
            <UpcomingPayments filteredIds={[]} />
          </div>
          <div className="col-span-3">
            <PayoffTimeline filteredIds={[]} />
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-1">
          <div className="col-span-2">
            <PaymentsCalendar filteredIds={[]} />
          </div>

          <div className="col-span-2">
            <NetTotalChart filteredIds={[]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
