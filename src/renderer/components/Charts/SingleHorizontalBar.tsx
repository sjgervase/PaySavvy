import { createGradient, getVisibleTextColor } from '@utils/colors'
import { getPercentage } from '@utils/math'
import { LinearGradient } from '@visx/gradient'
import { Group } from '@visx/group'
import { animated } from '@react-spring/web'
import { numberToPercent } from '@utils/formatters'
import { SingleHorizontalBarProps } from 'singleHorizontalBarTypes'

import { opacityAnim, scaleAnim } from '@utils/animations'
import AnimatedCurrency from '@components/Animations/AnimatedCurrency'

const BAR_HEIGHT = 32
const BAR_RX_AND_TEXT_X = BAR_HEIGHT * 0.25

const HorizontalBar = ({
  id,
  color = '000000',
  amount = 0,
  total = 1,
  handleClick
}: SingleHorizontalBarProps): JSX.Element => {
  // Percent
  const percentage = getPercentage(amount, total)

  // Gradient generator
  const grad = createGradient(color)

  return (
    <svg width="100%" height={BAR_HEIGHT}>
      <Group top={0} left={0}>
        <LinearGradient id={`grad-${id}`} from={grad[0]} to={grad[1]} vertical={false} />
        <animated.rect
          width={scaleAnim(percentage, numberToPercent)}
          fill={`url('#${`grad-${id}`}')`}
          height={BAR_HEIGHT}
          rx={BAR_RX_AND_TEXT_X}
          onClick={handleClick}
          className="cursor-pointer"
        />
        <text
          fill={getVisibleTextColor(color)}
          x={BAR_RX_AND_TEXT_X}
          y="54%"
          dominantBaseline="middle"
          textAnchor="start"
          onClick={handleClick}
          className="font-mono cursor-pointer"
        >
          <AnimatedCurrency amount={amount} size="lg" />

          <animated.tspan className="font-thin text-sm" opacity={opacityAnim(750)} dy={-2}>
            {` (${percentage}%)`}
          </animated.tspan>
        </text>
      </Group>
    </svg>
  )
}

export default HorizontalBar
