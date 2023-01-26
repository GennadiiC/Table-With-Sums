import * as React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import { Row } from '../../context/context'
import { useContext, useState } from 'react'
import { MatrixContext } from '../../context/context';
import { blueGrey, grey } from '@mui/material/colors'


interface IProps {
  row: Row
  index: number
}


export default function DynamicRow(props: IProps) {

  const {
    row,
    index,
  } = props

  const { actions } = useContext(MatrixContext)

  const [hovered, setHovered] = useState<boolean>(false)


  return (
    <>
      <TableRow
        key={index}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          backgroundColor: 
            hovered ? 
            blueGrey[50] :
            null
        }}
      >
        <TableCell  scope="row">
          Cell Values row {index + 1}
        </TableCell>
        {
          row.array.map((ob, i) => 
          <TableCell key={i} align="center">
            <Button
              onClick={() => actions.incrementer(row.id, ob.id)}
              color='success'
            >
              {!hovered && ob.amount}
              {hovered && `${ob.percentage} %`}
            </Button>
          </TableCell>
          )
        }
        <TableCell 
          align="center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            cursor: 'crosshair'
          }}
        >
          {row.total}
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => actions.deleteRowHandler(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  )
}
