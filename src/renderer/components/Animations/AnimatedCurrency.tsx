import { animated } from '@react-spring/web'
import { numberAnim } from '@utils/animations'
import { numberToCurrency } from '@utils/formatters'

const getCents = (amount: number): string => `${(amount - Math.floor(amount)).toFixed(2).slice(1)}`

type AnimatedCurrencyProps = { amount: number; isSVG?: boolean }

const AnimatedCurrency = ({ amount, isSVG = false }: AnimatedCurrencyProps): JSX.Element => {
  const dollarAnim = numberAnim(amount, (n) => numberToCurrency(Math.floor(n), false))
  const centAnim = numberAnim(amount, getCents)

  if (isSVG)
    return (
      <tspan dominantBaseline="auto" className="font-mono">
        <animated.tspan>{dollarAnim}</animated.tspan>
        <animated.tspan fontSize="80%">{centAnim}</animated.tspan>
      </tspan>
    )

  return (
    <span className="font-mono">
      <animated.span>{dollarAnim}</animated.span>
      <animated.span style={{ fontSize: '80%' }}>{centAnim}</animated.span>
    </span>
  )
}

export default AnimatedCurrency
