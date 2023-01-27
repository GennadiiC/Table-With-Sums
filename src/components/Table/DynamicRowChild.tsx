import * as React from 'react'
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { useContext } from 'react'
import { useNearestAmounts } from './useNearestAmounts';
import { MatrixContext } from '../../context/context';
import { Row, Cell } from '../../context/context'

interface ICellProps {
  i: number
  row: Row
  ob: Cell
  hovered: boolean
}

export default function DynamicRowChild(props: ICellProps) {

  const {
    i,
    row,
    ob,
    hovered
  } = props

  const { actions } = useContext(MatrixContext)

  const bgColor = useNearestAmounts(ob.id)

  return (
    <>
      <TableCell
        key={i} 
        align="center" 
        id={ob.id} 
        sx={{
          backgroundColor: bgColor
        }} 
      >
        <Button
          onClick={(e) => {
            actions.incrementer(row.id, ob.id)
            actions.nearestAmounts(ob, e)
          }}
          color='success'
          onMouseEnter={(e) => actions.nearestAmounts(ob, e)}
          onMouseLeave={(e) => actions.nearestAmounts(ob, e)}
        >
          {!hovered && ob.amount}
          {hovered && `${ob.percentage} %`}
        </Button>
      </TableCell>
    </>
  )
}
