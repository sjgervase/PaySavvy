import Pie, { PieArcDatum } from '@visx/shape/lib/shapes/Pie'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleOrdinal } from '@visx/scale'
import { animated, useTransition, to, useSpring } from '@react-spring/web'

import {
  PieChartProps,
  BaseChartProps,
  AnimatedSliceProps,
  PieDataPoint,
  AnimatedSliceStyles
} from 'pieChartTypes'

import { numberToCurrency } from '@utils/utils'

// sort and value funcs
const sort = (a: number, b: number): number => b - a
const value = (el: PieDataPoint): number => el.amount

const BaseChart = ({ height, width, data }: BaseChartProps): JSX.Element => {
  // chart bounds calculations
  const outerRadius = Math.min(height, width) / 2
  const innerRadius = (outerRadius / 3) * 2
  const top = height / 2
  const left = width / 2
  // color scale
  const getColor = scaleOrdinal({
    domain: data.map((d) => d.name),
    range: data.map((d) => `#${d.color}`)
  })

  // Total
  const total = data.reduce((sum, d) => sum + d.amount, 0)
  const { number } = useSpring({ number: total, from: { number: 0 } })

  return (
    <svg width={width} height={height}>
      <Group top={top} left={left}>
        <Pie
          data={data}
          pieValue={value}
          pieSortValues={sort}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
          cornerRadius={3}
          padAngle={0.005}
        >
          {(pie) => (
            <AnimatedSlice
              {...pie}
              getKey={(arc) => arc.data.name}
              getColor={(arc) => getColor(arc.data.name)}
              onClickDatum={(arc) => {
                console.log(arc.data)
              }}
            />
          )}
        </Pie>

        <animated.text
          fill="black"
          dy=".33em"
          fontSize={25}
          textAnchor="middle"
          pointerEvents="none"
          className="font-mono"
        >
          {number.to((n) => numberToCurrency(n))}
        </animated.text>
      </Group>
    </svg>
  )
}

const fromLeaveTransition = ({ endAngle }: PieArcDatum<PieDataPoint>): AnimatedSliceStyles => ({
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0, // enter from 360° if end angle is > 180°
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0
})

const enterUpdateTransition = ({
  startAngle,
  endAngle
}: PieArcDatum<PieDataPoint>): AnimatedSliceStyles => ({ startAngle, endAngle, opacity: 1 })

const AnimatedSlice = ({
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum
}: AnimatedSliceProps<PieDataPoint>): JSX.Element => {
  const transitions = useTransition<PieArcDatum<PieDataPoint>, AnimatedSliceStyles>(arcs, {
    from: fromLeaveTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: fromLeaveTransition,
    keys: getKey
  })

  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc)
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({ ...arc, startAngle, endAngle })
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".25em"
              fontSize={20}
              textAnchor="middle"
              pointerEvents="none"
            >
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    )
  })
}

const PieChart = ({ data }: PieChartProps): JSX.Element => (
  <ParentSize>
    {({ height, width }) => <BaseChart height={height} width={width} data={data} />}
  </ParentSize>
)

export default PieChart
