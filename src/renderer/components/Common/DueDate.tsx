import { getDaysUntilDate } from '@utils/dates'
import { Badge } from './badge'

const todayClassNames =
  'cursor-pointer border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white'
const tomorrowClassNames =
  'cursor-pointer border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'

const DueDate = ({ date }: { date: Date }): JSX.Element => {
  const days = Math.abs(getDaysUntilDate(date))

  if (days === 0)
    return (
      <Badge variant="outline" className={todayClassNames}>
        DUE TODAY
      </Badge>
    )

  if (days === 1)
    return (
      <Badge variant="outline" className={tomorrowClassNames}>
        DUE TOMORROW
      </Badge>
    )

  return (
    <Badge variant="outline" className="cursor-pointer">
      DUE IN {days} DAYS
    </Badge>
  )
}

export default DueDate
