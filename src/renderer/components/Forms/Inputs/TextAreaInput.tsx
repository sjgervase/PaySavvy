import { FormControl, FormItem, FormLabel, FormMessage } from '@components/Common/form'
import { Textarea } from '@components/Common/textarea'
import { InformativeTooltip } from '@components/Common/tooltip'

import { GeneralInputProps } from 'formInputTypes'

const TextAreaInput = ({ label, width, field, info }: GeneralInputProps): JSX.Element => (
  <FormItem className={`col-span-${width}`}>
    <FormLabel>
      {label}
      {info && <InformativeTooltip blurb={info} />}
    </FormLabel>
    <FormControl>
      <Textarea placeholder="" className="resize-none" {...field} />
    </FormControl>
    <FormMessage />
  </FormItem>
)

export default TextAreaInput
