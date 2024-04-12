import React from 'react'
import { useSelector } from 'react-redux'
import { addMonths, isBefore } from 'date-fns'

import { numberToCurrency } from '@utils/formatters'
import { Card, CardContent, CardHeader, CardTitle } from '@components/Common/card'
import CardActionBlock from './CardAccessories/CardActionBlock'
import SingleHorizontalBar from '@components/Charts/SingleHorizontalBar'
import { Separator } from '@components/Common/separator'
import DueDate from '@components/Common/DueDate'

import { SortBadge } from './CardAccessories/ActionBadges'
import { selectPaymentsByIds } from '@store/repaymentSlice'
import { CardProps } from '@localTypes/cards'

const UpcomingPayments = ({ filteredIds }: CardProps): JSX.Element => {
  // get filtered store data and capture next payment
  const upcomingPaymentsData = useSelector(selectPaymentsByIds(filteredIds))
    .map((datum) => ({
      id: datum.id,
      name: datum.name,
      color: datum.color,
      date: datum.upcomingPayments[0].date,
      amount: datum.upcomingPayments[0].amount
    }))
    .filter((datum) => isBefore(datum.date, addMonths(new Date(), 1)))

  // calculate total for percentage based graphing
  const total = upcomingPaymentsData.reduce((sum, p) => sum + p.amount, 0)

  // on click of element
  const handleClick = (id): void => {
    console.log(id)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Due This Month</CardTitle>
        <CardActionBlock
          leftNode={upcomingPaymentsData.length}
          centerNode={numberToCurrency(total)}
          rightNode={<SortBadge />}
        />
      </CardHeader>

      <CardContent>
        {upcomingPaymentsData.map((d, i) => (
          <React.Fragment key={d.id}>
            <div className="flex flex-row content-center items-center">
              <h4 className="pr-2 hover:underline cursor-pointer" onClick={() => handleClick(d.id)}>
                {`${d.name}`}
              </h4>
              <DueDate date={d.date} />
            </div>
            <SingleHorizontalBar
              id={d.id}
              color={d.color}
              amount={d.amount}
              total={total}
              handleClick={() => handleClick(d.id)}
            />
            {i !== upcomingPaymentsData.length - 1 && <Separator className="my-3" />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  )
}

export default UpcomingPayments
