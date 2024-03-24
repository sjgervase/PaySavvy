declare module 'pieChartTypes' {
  type PieChartProps = {
    data: PieDataPoint[]
  }
  type BaseChartProps = {
    width: number
    height: number
    data: PieDataPoint[]
  }
  type AnimatedSliceProps<Datum> = ProvidedProps<Datum> & {
    getKey: (d: PieArcDatum<Datum>) => string
    getColor: (d: PieArcDatum<Datum>) => string
    onClickDatum: (d: PieArcDatum<Datum>) => void
    delay?: number
  }
  type AnimatedSliceStyles = {
    startAngle: number
    endAngle: number
    opacity: number
  }
  type PieDataPoint = {
    id: string
    color: string
    amount: number
    name: string
  }
}

declare module 'singleHorizontalBarTypes' {
  type SingleHorizontalBarProps = {
    id: string
    color: string
    amount: number
    total: number
    handleClick: () => void
  }
}
