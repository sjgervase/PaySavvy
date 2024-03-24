import { Separator } from '@components/Common/separator'

type ActionNode = string | JSX.Element | number
type CardActionBlockProps = {
  leftNode: ActionNode
  centerNode: ActionNode
  rightNode: ActionNode
}
const CardActionBlock = ({
  leftNode,
  centerNode,
  rightNode
}: CardActionBlockProps): JSX.Element => {
  return (
    <>
      <div className="flex flex-row text-sm font-mono justify-between pt-2.5 cursor-default select-none">
        <div className="basis-1/3 text-center">{leftNode}</div>
        <Separator orientation="vertical" className="h-100" />
        <div className="basis-1/3 text-center">{centerNode}</div>
        <Separator orientation="vertical" className="h-100" />
        <div className="basis-1/3 text-center">{rightNode}</div>
      </div>
      <Separator />
    </>
  )
}

export default CardActionBlock
