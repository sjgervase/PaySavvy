import { animated } from '@react-spring/web'
import { numberAnim } from '@utils/animations'
import { numberToCurrency } from '@utils/formatters'

const SIZES = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl'
] as const
const VERTICAL_ADJUSTMENT = [12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128]

const getAdjustments = (size: string): (string | number)[] => {
  const i = SIZES.findIndex((s) => s === size)
  if (i >= 3) return [`text-${SIZES[i - 3]}`, VERTICAL_ADJUSTMENT[i] * 0.1]
  return [`text-${SIZES[0]}`, VERTICAL_ADJUSTMENT[i] * 0.1]
}

const getCents = (amount: number): string => `${(amount - Math.floor(amount)).toFixed(2).slice(1)}`

const AnimatedCurrency = ({
  amount,
  size = 'base'
}: {
  amount: number
  size: (typeof SIZES)[number]
}): JSX.Element => {
  const adjustments = getAdjustments(size)
  return (
    <>
      <animated.tspan className={`font-mono text-${size}`}>
        {numberAnim(amount, (n) => numberToCurrency(Math.floor(n), false))}
      </animated.tspan>
      <animated.tspan className={`font-mono ${adjustments[0]}`} dy={adjustments[1]}>
        {numberAnim(amount, getCents)}
      </animated.tspan>
    </>
  )
}
export default AnimatedCurrency
