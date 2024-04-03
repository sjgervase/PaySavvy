import Pie, { PieArcDatum } from '@visx/shape/lib/shapes/Pie'
import { Group } from '@visx/group'
import { ParentSize } from '@visx/responsive'
import { scaleOrdinal } from '@visx/scale'
import { animated, useTransition, to } from '@react-spring/web'
import { PieChartProps, PieDataPoint, AnimatedSliceStyles } from 'pieChartTypes'
import AnimatedCurrency from '@components/Animations/AnimatedCurrency'

// Accessors
const value = (el: PieDataPoint): number => el.amount
const sort = (a: number, b: number): number => b - a
const getId = (arc: PieArcDatum<PieDataPoint>): string => arc.data.id
const getName = (arc: PieArcDatum<PieDataPoint>): string => arc.data.name

// Transitions
const fromLeaveTransition = ({ endAngle }: PieArcDatum<PieDataPoint>): AnimatedSliceStyles => ({
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0, // enter from 360° if end angle is > 180°
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0
})
const enterUpdateTransition = ({
  startAngle,
  endAngle
}: PieArcDatum<PieDataPoint>): AnimatedSliceStyles => ({ startAngle, endAngle, opacity: 1 })

const PieChart = ({ data }: PieChartProps): JSX.Element => {
  const getColor = scaleOrdinal({
    domain: data.map((d) => d.id),
    range: data.map((d) => d.color)
  })

  const total = data.reduce((sum, d) => sum + d.amount, 0)
  console.log(total)

  return (
    <ParentSize>
      {({ height, width }) => (
        <svg width={width} height={height}>
          <Group top={height / 2} left={width / 2}>
            <Pie
              data={data}
              pieValue={value}
              pieSortValues={sort}
              outerRadius={Math.min(height, width) / 2}
              innerRadius={Math.min(height, width) / 3}
              cornerRadius={3}
              padAngle={0.005}
            >
              {(pie) => {
                const transitions = useTransition<PieArcDatum<PieDataPoint>, AnimatedSliceStyles>(
                  pie.arcs,
                  {
                    from: fromLeaveTransition,
                    enter: enterUpdateTransition,
                    update: enterUpdateTransition,
                    leave: fromLeaveTransition,
                    keys: getId
                  }
                )

                return transitions((props, arc, { key }) => {
                  const [centroidX, centroidY] = pie.path.centroid(arc)
                  const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

                  return (
                    <g key={key}>
                      <animated.path
                        d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
                          pie.path({ ...arc, startAngle, endAngle })
                        )}
                        fill={getColor(arc.data.id)}
                        onClick={() => {
                          console.log(arc.data.id)
                        }}
                      />
                      {hasSpaceForLabel && (
                        <animated.g style={{ opacity: props.opacity }}>
                          <text
                            x={centroidX}
                            y={centroidY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            pointerEvents="none"
                            className="text-base"
                            fill="white"
                          >
                            {getName(arc)}
                          </text>
                        </animated.g>
                      )}
                    </g>
                  )
                })
              }}
            </Pie>

            <text
              textAnchor="middle"
              dominantBaseline="middle"
              pointerEvents="none"
              className="text-2xl"
            >
              <AnimatedCurrency amount={total} isSVG={true} />
            </text>
          </Group>
        </svg>
      )}
    </ParentSize>
  )
}

export default PieChart
