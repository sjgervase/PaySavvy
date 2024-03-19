import { addDays } from 'date-fns'

import BarChart from '@components/Charts/BarChart'

type UpcomingPaymentsProps = {
  data: object[]
}
const UpcomingPayments = ({ data }: UpcomingPaymentsProps): JSX.Element => {
  const mock = data.map((d) => ({
    ...d,
    payments: [addDays(new Date(), Math.floor(Math.random() * 7))]
  }))

  return (
    <div>
      {/* {mock.map((i) => (
        <div key={i.id}>
          <p>{i.name}</p>
          <p>{i.amount}</p>
        </div>
      ))} */}

      <BarChart />
    </div>
  )
}

export default UpcomingPayments
