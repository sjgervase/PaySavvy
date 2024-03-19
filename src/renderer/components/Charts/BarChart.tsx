import React, { useMemo } from 'react'
import { Bar } from '@visx/shape'
import { Group } from '@visx/group'
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency'
import { scaleBand, scaleLinear } from '@visx/scale'
import { ParentSize } from '@visx/responsive'

import { numberToCurrency } from '@utils/utils'

const data = letterFrequency.slice(5)
const verticalMargin = 120

// accessors
const getLetter = (d: LetterFrequency) => d.letter
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100

const BaseChart = ({ height, width, events }): JSX.Element => {
  // bounds
  const xMax = width
  const yMax = height - verticalMargin

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getLetter),
        padding: 0.4
      }),
    [xMax]
  )
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getLetterFrequency))]
      }),
    [yMax]
  )

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {data.map((d) => {
          const letter = getLetter(d)
          const barWidth = xScale.bandwidth()
          const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0)
          const barX = xScale(letter)
          const barY = yMax - barHeight
          return (
            <Bar
              key={`bar-${letter}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events) alert(`clicked: ${JSON.stringify(Object.values(d))}`)
              }}
            />
          )
        })}
      </Group>
    </svg>
  )
}

const BarChart = ({ data }): JSX.Element => (
  <ParentSize>
    {({ height, width }) => <BaseChart height={height} width={width} events={false} />}
  </ParentSize>
)

export default BarChart
