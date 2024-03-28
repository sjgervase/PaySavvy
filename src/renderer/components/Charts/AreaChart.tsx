import React from 'react'
import { Group } from '@visx/group'
import { AreaClosed } from '@visx/shape'
import { AxisLeft, AxisBottom, AxisScale, TickRendererProps } from '@visx/axis'
import { LinearGradient } from '@visx/gradient'
import { curveMonotoneX } from '@visx/curve'
import { formatDate } from 'date-fns'

// Initialize some variables
const axisColor = '#000'

const axisBottomTickLabelProps = {
  fill: axisColor
}

const axisLeftTickLabelProps = {
  className: 'font-mono text-sm',
  dx: '-0.25em',
  dy: '0.3em',
  textAnchor: 'end' as const,
  fill: axisColor
}

type Datum = {
  date: Date
  amount: number
}

const formatAmount = (amount: number | string | undefined): string =>
  Number(amount) >= 1000 ? `$${Number(amount) / 1000}K` : `$${Number(amount)}`

const customDateTick = ({ dy, fill, formattedValue, x, y }: TickRendererProps): JSX.Element => (
  <text x={x} y={y} fill={fill} textAnchor="middle" className="text-xs">
    <tspan dy={dy}>{formattedValue?.split('-')[0]}</tspan>
    <tspan x={x} dy={10}>
      {formattedValue?.split('-')[1]}
    </tspan>
  </text>
)

// accessors
const getDate = (d: Datum): Date => new Date(d.date)
const getAmount = (d: Datum): number => d.amount

const AreaChart = ({
  data,
  gradientColor,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  children
}: {
  data: Datum[]
  gradientColor: string
  xScale: AxisScale<number>
  yScale: AxisScale<number>
  width: number
  yMax: number
  margin: { top: number; right: number; bottom: number; left: number }
  hideBottomAxis?: boolean
  hideLeftAxis?: boolean
  top?: number
  left?: number
  children?: React.ReactNode
}): JSX.Element | null => {
  if (width < 10) return null

  return (
    <Group left={left || margin.left} top={top || margin.top}>
      <LinearGradient
        id="gradient"
        from={gradientColor}
        fromOpacity={1}
        to={gradientColor}
        toOpacity={0.2}
      />
      <AreaClosed<Datum>
        data={data}
        x={(d) => xScale(getDate(d)) || 0}
        y={(d) => yScale(getAmount(d)) || 0}
        yScale={yScale}
        strokeWidth={1}
        stroke="url(#gradient)"
        fill="url(#gradient)"
        curve={curveMonotoneX}
      />
      {!hideBottomAxis && (
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={12}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={axisBottomTickLabelProps}
          tickFormat={(date: Date): string => formatDate(date, 'MMM-yyyy').toUpperCase()}
          tickComponent={customDateTick}
        />
      )}
      {!hideLeftAxis && (
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={axisLeftTickLabelProps}
          tickFormat={formatAmount}
        />
      )}
      {children}
    </Group>
  )
}

export default AreaChart
