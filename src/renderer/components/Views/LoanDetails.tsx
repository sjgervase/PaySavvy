import AnimatedCurrency from '@components/Animations/AnimatedCurrency'
import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'
import { selectSingleLoan } from '@store/loansSlice'
import SingleHorizontalBar from '@components/Charts/SingleHorizontalBar'

import { useSelector } from 'react-redux'

type LoanDetailsProps = { loanId: string }

const LoanDetails = ({ loanId }: LoanDetailsProps): JSX.Element => {
  // get loan data
  const {
    id,
    name,
    //
    color,
    currency,
    interestRate,
    lender,
    notes,
    payment,
    paymentHistory,
    remainingAmount,
    startDate,
    status,
    totalAmount
  } = useSelector(selectSingleLoan(loanId))

  console.log({
    id,
    name,
    //
    color,
    currency,
    interestRate,
    lender,
    notes,
    payment,
    paymentHistory,
    remainingAmount,
    startDate,
    status,
    totalAmount
  })

  return (
    <Card className="m-1">
      <CardHeader>
        <CardTitle>
          {name} <AnimatedCurrency amount={remainingAmount} />
        </CardTitle>

        {/*  */}
      </CardHeader>

      <CardContent className="w-full aspect-square">
        <SingleHorizontalBar
          id={id}
          color={color}
          amount={totalAmount - remainingAmount}
          total={totalAmount}
          handleClick={() => handleClick(d.id)}
        />
      </CardContent>
    </Card>
  )
}

export default LoanDetails
