declare module '@shadcn/types' {
  type Div = HTMLDivElement
  type Para = HTMLParagraphElement
  type Head = HTMLHeadingElement

  type Attr<HTMLElement> = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
    className?: string
  }
}
