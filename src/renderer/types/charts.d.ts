declare module 'pieChartTypes' {
  type PieDataPoint = { id: string; color: string; amount: number; name: string }

  type PieChartProps = { data: PieDataPoint[] }

  type BaseChartProps = { width: number; height: number; data: PieDataPoint[] }

  type AnimatedSliceProps<Datum> = ProvidedProps<Datum> & {
    getKey: (d: PieArcDatum<Datum>) => string
    getColor: (d: PieArcDatum<Datum>) => string
    onClickDatum: (d: PieArcDatum<Datum>) => void
    delay?: number
  }

  type AnimatedSliceStyles = { startAngle: number; endAngle: number; opacity: number }
}
