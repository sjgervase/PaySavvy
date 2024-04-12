import { selectLoansByIds } from '@store/loansSlice'

import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'
import CardActionBlock from './CardAccessories/CardActionBlock'
import PieChart from '@components/Charts/PieChart'
import { CardProps } from '@localTypes/cards'

const NetTotalChart = ({ filteredIds }: CardProps): JSX.Element => {
  // get loan data
  const netTotalsData = useSelector(selectLoansByIds(filteredIds)).map((d) => ({
    id: d.id,
    color: d.color,
    amount: d.remainingAmounts.remainingTotal,
    name: d.name
  }))

  console.log(netTotalsData)

  return (
    <Card>
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
