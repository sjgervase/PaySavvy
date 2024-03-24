import { selectLoansByIds } from '@store/loansSlice'
import { CardProps } from 'cardPropTypes'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'
import CardActionBlock from './CardAccessories/CardActionBlock'
import PieChart from '@components/Charts/PieChart'

const NetTotalChart = ({ filteredIds }: CardProps): JSX.Element => {
  // get loan data
  const netTotalsData = useSelector(selectLoansByIds(filteredIds)).map((d) => ({
    id: d.id,
    color: d.color,
    amount: d.remainingAmount,
    name: d.name
  }))

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>Net Total</CardTitle>
        <CardActionBlock leftNode={'TODO'} centerNode={'TODO'} rightNode={'TODO'} />
      </CardHeader>

      <CardContent className="w-full aspect-square">
        <PieChart data={netTotalsData} />
      </CardContent>
    </Card>
  )
}

export default NetTotalChart
