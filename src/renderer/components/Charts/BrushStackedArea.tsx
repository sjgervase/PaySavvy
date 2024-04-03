import { useRef, useState, useMemo } from 'react'
import { scaleTime, scaleLinear } from '@visx/scale'
import { Brush } from '@visx/brush'
import { Bounds } from '@visx/brush/lib/types'
import BaseBrush from '@visx/brush/lib/BaseBrush'
import { PatternLines } from '@visx/pattern'
import { Group } from '@visx/group'
import { extent } from '@visx/vendor/d3-array'
import { BrushHandleRenderProps } from '@visx/brush/lib/BrushHandle'
import AreaChart from './AreaChart'
import { ParentSize } from '@visx/responsive'
import { AreaStack } from '@visx/shape'
import { AxisBottom, AxisLeft, TickRendererProps } from '@visx/axis'
import { curveMonotoneX } from '@visx/curve'
import { formatDate } from 'date-fns'
import { createGradient } from '@utils/colors'
import { LinearGradient } from '@visx/gradient'

// SIZING, COLOR, STYLE CONSTANTS
// Brush Constants
const brushMargin = { top: 10, bottom: 15, left: 50, right: 20 }
const BRUSH_PATTERN_ID = 'brush_pattern'
const accentColor = '#f6acc8'
const selectedBrushStyle = { fill: `url(#${BRUSH_PATTERN_ID})`, stroke: 'white' }
// Chart Constants
const defaultBackground = '#af8baf'
const chartMargin = { top: 10, left: 50, bottom: 20, right: 20 }
const chartSeparation = 30

// TYPES
type Identifier = { id: string; color: string; name: string }
type StackedAreaProps = {
  data: Array<{ date: Date }>
  identifiers: Identifier[]
  width: number
  height: number
}

// TICK FORMAT AND COMPONENTS
const axisColor = '#000'
const axisBottomTickLabelProps = { fill: axisColor }
const axisLeftTickLabelProps = {
  className: 'font-mono text-sm',
  dx: '-0.25em',
  dy: '0.3em',
  textAnchor: 'end' as const,
  fill: axisColor
}
const formatAmount = (amount): string =>
  Number(amount) >= 1000 ? `$${Number(amount) / 1000}K` : `$${Number(amount)}`

const customDateTick = ({ dy, fill, formattedValue, x, y }: TickRendererProps): JSX.Element => (
  <text x={x} y={y} fill={fill} textAnchor="middle" className="text-xs">
    <tspan dy={dy}>{formattedValue?.split('-')[0]}</tspan>
    <tspan x={x} dy={10}>
      {formattedValue?.split('-')[1]}
    </tspan>
  </text>
)

// ACCESSORS
const getValues = (d): number =>
  Object.keys(d).reduce((sum, key) => (key === 'date' ? sum : sum + d[key]), 0)
const getGradientId = (id): string => `grad-${id}-brush`
const getDate = (d): Date => d.date
const getY0 = (d): number => d[0]
const getY1 = (d): number => d[1]

// BASE CHART
const BaseChart = ({ data, identifiers, width, height }: StackedAreaProps): JSX.Element => {
  const brushRef = useRef<BaseBrush | null>(null)
  // data state, with initial being first 12 months
  const [filteredData, setFilteredData] = useState(data.slice(0, 12))

  // when brush is moved
  const onBrushChange = (domain: Bounds | null): void => {
    if (!domain) return
    const { x0, x1 } = domain
    const dataCopy = data.filter((d) => {
      const x = getDate(d).getTime()
      return x > x0 && x < x1
    })
    setFilteredData(dataCopy)
  }

  // Keys
  const keys = identifiers.map((el) => el.id)

  // Chart Size and Margin
  const innerHeight = height - chartMargin.top - chartMargin.bottom
  const topChartBottomMargin = chartSeparation + 10
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin
  const bottomChartHeight = innerHeight - topChartHeight - chartSeparation

  // bounds
  const xMax = Math.max(width - chartMargin.left - chartMargin.right, 0)
  const yMax = Math.max(topChartHeight, 0)
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0)
  const yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0)

  // Main Chart Scales
  const xScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xMax],
        domain: extent(filteredData, getDate) as [Date, Date]
      }),
    [xMax, filteredData]
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        domain: [0, Math.max(...filteredData.map(getValues))],
        nice: true
      }),
    [yMax, filteredData]
  )

  // Brush Chart Scales
  const brushXScale = useMemo(
    () =>
      scaleTime<number>({
        range: [0, xBrushMax],
        domain: extent(data, getDate) as [Date, Date]
      }),
    [xBrushMax]
  )
  const brushYScale = useMemo(
    () =>
      scaleLinear({
        range: [yBrushMax, 0],
        domain: [0, Math.max(...data.map(getValues))],
        nice: true,
        round: true
      }),
    [yBrushMax]
  )

  // TODO: make end value one of several constants to sort show ticks by month, year, etc
  const initialBrushPosition = useMemo(
    () => ({
      start: { x: brushXScale(getDate(data[0])) },
      end: { x: brushXScale(getDate(data[12])) }
    }),
    [brushXScale]
  )

  return (
    <svg width={width} height={height} className="select-none">
      {/* MAIN CHART */}
      <Group left={chartMargin.left} top={chartMargin.top}>
        {identifiers.map((el) => {
          const grad = createGradient(el.color)
          return (
            <LinearGradient
              key={getGradientId(el.id)}
              id={getGradientId(el.id)}
              from={grad[0]}
              to={grad[1]}
              vertical={true}
            />
          )
        })}
        <AreaStack
          keys={keys}
          data={filteredData}
          curve={curveMonotoneX}
          x={(d) => xScale(getDate(d.data)) ?? 0}
          y0={(d) => yScale(getY0(d)) ?? 0}
          y1={(d) => yScale(getY1(d)) ?? 0}
          strokeWidth={1}
        >
          {({ stacks, path }) =>
            stacks.map((stack) => (
              <path
                key={`stack-${stack.key}`}
                x={width - chartMargin.left}
                d={path(stack) || ''}
                fill={`url('#${getGradientId(stack.key)}')`}
                onClick={() => {
                  console.log(`${stack.key}`)
                }}
              />
            ))
          }
        </AreaStack>
        <AxisBottom
          top={yMax}
          scale={xScale}
          numTicks={12}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={axisBottomTickLabelProps}
          tickFormat={(date): string =>
            date instanceof Date ? formatDate(date, 'MMM-yyyy').toUpperCase() : `${date}`
          }
          tickComponent={customDateTick}
        />
        <AxisLeft
          scale={yScale}
          numTicks={5}
          stroke={axisColor}
          tickStroke={axisColor}
          tickLabelProps={axisLeftTickLabelProps}
          tickFormat={formatAmount}
        />
      </Group>

      {/* BRUSH CHART */}
      <AreaChart
        hideBottomAxis={true}
        hideLeftAxis={true}
        data={data.map((d) => ({ date: d.date, amount: getValues(d) }))}
        width={width}
        yMax={yBrushMax}
        xScale={brushXScale}
        yScale={brushYScale}
        margin={brushMargin}
        top={topChartHeight + topChartBottomMargin + chartMargin.top}
        gradientColor={defaultBackground}
      >
        <PatternLines
          id={BRUSH_PATTERN_ID}
          height={8}
          width={8}
          stroke={accentColor}
          strokeWidth={1}
          orientation={['diagonal']}
        />
        <Brush
          xScale={brushXScale}
          yScale={brushYScale}
          width={xBrushMax}
          height={yBrushMax}
          margin={brushMargin}
          resizeTriggerAreas={[]} // hide resize handles
          disableDraggingOverlay={true} // disable resize
          innerRef={brushRef}
          brushDirection="horizontal"
          initialBrushPosition={initialBrushPosition}
          onChange={onBrushChange}
          onClick={() => setFilteredData(data)}
          selectedBoxStyle={selectedBrushStyle}
          useWindowMoveEvents
          renderBrushHandle={(props) => <BrushHandle {...props} />}
        />
      </AreaChart>
    </svg>
  )
}
// We need to manually offset the handles for them to be rendered at the right position
const BrushHandle = ({ x, height, isBrushActive }: BrushHandleRenderProps): JSX.Element | null => {
  const pathWidth = 8
  const pathHeight = 15
  if (!isBrushActive) {
    return null
  }
  return (
    <Group left={x + pathWidth / 2} top={(height - pathHeight) / 2}>
      <path
        fill="#f2f2f2"
        d="M -4.5 0.5 L 3.5 0.5 L 3.5 15.5 L -4.5 15.5 L -4.5 0.5 M -1.5 4 L -1.5 12 M 0.5 4 L 0.5 12"
        stroke="#999999"
        strokeWidth="1"
        style={{ cursor: 'ew-resize' }}
      />
    </Group>
  )
}

const Wrapper = ({
  data,
  identifiers
}: {
  data: Array<{ date: Date }>
  identifiers: Identifier[]
}): JSX.Element => (
  <ParentSize>
    {({ height, width }) => (
      <BaseChart data={data} identifiers={identifiers} height={height} width={width} />
    )}
  </ParentSize>
)

export default Wrapper
