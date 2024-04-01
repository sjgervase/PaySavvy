declare module 'formInputTypes' {
  import { ControllerRenderProps } from 'react-hook-form'

  type GeneralInputProps = {
    label: string | undefined
    width: number
    field: ControllerRenderProps
    placeholder?: string
    info?: string
  }

  type SelectInputProps = GeneralInputProps & {
    options: Array<{ value: string; label: string }>
  }
}
