declare module 'cardPropTypes' {
  type CardProps = { filteredIds: string[] }
}

declare module 'paymentsCalendarTypes' {
  import { DayProps } from 'react-day-picker'

  interface CustomDayProps extends DayProps {
    indicatorData: LoanBasicFields[]
    clearSelection: () => void
  }
}
