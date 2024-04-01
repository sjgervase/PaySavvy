import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@components/Common/form'

import { Button } from '@components/Common/button'
import { Input } from '@components/Common/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/Common/card'
import { createRandomColor } from '@utils/colors'
import { Separator } from '@components/Common/separator'

import CurrencyInput from './Inputs/CurrencyInput'
import DatePickerInput from './Inputs/DatePickerInput'
import SelectInput from './Inputs/SelectInput'
import TextAreaInput from './Inputs/TextAreaInput'
import { ScrollArea } from '@components/Common/scroll-area'
//
//
//
//

/*
  TODO:

  - disallow repeated names
  - disallow repeated colors
*/

const gridRowClasses = 'grid grid-cols-4 gap-3'

const formInputProperties = {
  loanName: { label: 'Loan Name', description: '', placeHolder: '' },
  color: { label: 'Display Color', description: '', placeHolder: '' },
  totalAmount: { label: 'Total Amount', description: '', placeHolder: '' },
  remainingAmount: { label: 'Remaining Amount', description: '', placeHolder: '' },
  interestRate: { label: 'Interest Rate', description: '', placeHolder: '' },
  paymentAmount: { label: 'Payment Amount', description: '', placeHolder: '' },
  paymentCount: { label: 'Total Number of Payments', description: '', placeHolder: '' },
  remainingCount: { label: 'Remaining Payments', description: '', placeHolder: '' },
  intervalType: { label: 'Payment Frequency', description: '', placeHolder: '' },
  lender: { label: 'Name of Lender', description: '', placeHolder: '' },
  startDate: { label: 'Loan Start Date', description: '', placeHolder: '' },
  notes: {
    label: 'Additional Notes',
    info: 'Please do not include login passwords, usernames, account numbers, or other sensitive information',
    placeHolder: ''
  }
}

const formSchema = z.object({
  loanName: z.string().min(2, { message: 'Loan name must be at least 2 characters.' }),
  color: z.string().min(7),
  totalAmount: z.number({ invalid_type_error: 'Amount must be a number' }),
  remainingAmount: z.number({ invalid_type_error: 'Amount must be a number' }),
  interestRate: z.number({ invalid_type_error: 'Interest rate must be a number' }),
  paymentAmount: z.number({ invalid_type_error: 'Payment amount must be a number' }),
  paymentCount: z.number({ invalid_type_error: 'Payment count must be a number' }).int(),
  remainingCount: z.number({ invalid_type_error: 'Remaining count must be a number' }).int(),
  intervalType: z.string(),
  lender: z.string(),
  startDate: z.date(),
  notes: z.optional(z.string())
})
//
//
//

const getInputLabel = (inputName: string): string | undefined =>
  formInputProperties[inputName].label
const getInputInfo = (inputName: string): string | undefined => formInputProperties[inputName].info
const getInputPlaceholder = (inputName: string): string | undefined =>
  formInputProperties[inputName].placeHolder

const LoanForm = (): JSX.Element => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanName: '',
      color: createRandomColor(),
      totalAmount: 0,
      remainingAmount: 0,
      paymentAmount: 0
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="bg-slate-800 h-full p-6">
      <Card className="w-3/5 mx-auto h-full">
        <ScrollArea className="h-full">
          <CardHeader>
            <CardTitle>Add a New Loan</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <h4 className="mb-2">General Info</h4>
                <div className={gridRowClasses}>
                  <FormField
                    control={form.control}
                    name="loanName"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>{getInputLabel(field.name)}</FormLabel>
                        <FormControl>
                          <Input placeholder="Loan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>{getInputLabel(field.name)}</FormLabel>
                        <FormControl>
                          <Input type="color" {...field} style={{ backgroundColor: field.value }} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator className="my-4" />

                <h4 className="mb-2">Financial Info</h4>
                <div className={gridRowClasses}>
                  <FormField
                    control={form.control}
                    name="totalAmount"
                    render={({ field }) => (
                      <CurrencyInput
                        label={getInputLabel(field.name)}
                        width={3}
                        field={{ ...field }}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>{getInputLabel(field.name)}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="remainingAmount"
                    render={({ field }) => (
                      <CurrencyInput
                        label={getInputLabel(field.name)}
                        width={3}
                        field={{ ...field }}
                      />
                    )}
                  />
                </div>
                <Separator className="my-4" />

                <h4 className="mb-2">Payment Info</h4>
                <div className={gridRowClasses}>
                  <FormField
                    control={form.control}
                    name="paymentAmount"
                    render={({ field }) => (
                      <CurrencyInput
                        label={getInputLabel(field.name)}
                        width={2}
                        field={{ ...field }}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="remainingCount"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>{getInputLabel(field.name)}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="intervalType"
                    render={({ field }) => (
                      <SelectInput
                        label={getInputLabel(field.name)}
                        width={1}
                        field={{ ...field }}
                        options={[{ label: 'Monthly', value: 'MONTHLY' }]}
                        placeholder={getInputPlaceholder(field.name)}
                      />
                    )}
                  />
                </div>

                <Separator className="my-4" />

                <h4 className="mb-2">Other Info</h4>
                <div className={gridRowClasses}>
                  <FormField
                    control={form.control}
                    name="lender"
                    render={({ field }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>{getInputLabel(field.name)}</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <DatePickerInput
                        label={getInputLabel(field.name)}
                        width={2}
                        field={{ ...field }}
                      />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <TextAreaInput
                        label={getInputLabel(field.name)}
                        width={4}
                        field={{ ...field }}
                        info={getInputInfo(field.name)}
                      />
                    )}
                  />
                </div>

                <Separator className="my-4" />

                <div className="w-1/3 ml-auto flex justify-end">
                  <Button variant="outline">Cancel</Button>

                  <Button type="submit" className="ml-2">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </ScrollArea>
      </Card>

      {/*  */}
      {/*  */}
    </div>
  )
}

export default LoanForm
