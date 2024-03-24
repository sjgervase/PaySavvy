import { Badge } from '@components/Common/badge'
import { ArrowDownUp, ChevronRight, ChevronLeft } from 'lucide-react'

// className consts for consistency
const badgeClass = 'h-5 cursor-pointer'
const iconLeftClass = 'size-3.5 mr-1'

export const SortBadge = (): JSX.Element => (
  <Badge className={badgeClass}>
    <ArrowDownUp className={iconLeftClass} /> SORT
  </Badge>
)

export const NextMonthBadge = ({ label, handleClick }: ActionBadgeProps): JSX.Element => (
  <Badge className={badgeClass} onClick={handleClick}>
    <span className="ml-1">{label}</span>
    <ChevronRight className="size-3.5 ml-1" />
  </Badge>
)

export const LastMonthBadge = ({ label, handleClick }: ActionBadgeProps): JSX.Element => (
  <Badge className={badgeClass} onClick={handleClick}>
    <ChevronLeft className={iconLeftClass} />
    <span className="mr-1">{label}</span>
  </Badge>
)

// Types
type ActionBadgeProps = {
  label: string
  handleClick: () => void
}
