import { Interpolation, useSpring, config } from '@react-spring/web'

// Helpers
const defForm = (n): typeof n => n

// Scale Animation
export const scaleAnim: ScaleAnimationFunc = (scaler, formatter = defForm, delay = 0) =>
  useSpring({ from: { scale: 0 }, to: { scale: 1 }, delay }).scale.to((s) => formatter(s * scaler))

// Opacity Animation
export const opacityAnim: OpacityAnimationFunc = (delay = 0) =>
  useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay }).opacity.to((o) => o)

// Number Animation
export const numberAnim: NumberAnimationFunction = (amount, formatter = defForm) =>
  useSpring({ from: { number: 0 }, number: amount, delay: 0, config: config.slow }).number.to((n) =>
    formatter(n)
  )

//
//
//
// Types
type ScaleAnimationFunc = (
  scaler: number,
  formatter?: (value: number) => number | string,
  delay?: number
) => Interpolation

type OpacityAnimationFunc = (delay?: number) => Interpolation

type NumberAnimationFunction = (
  amount: number,
  formatter?: (value: number) => number | string
) => Interpolation
