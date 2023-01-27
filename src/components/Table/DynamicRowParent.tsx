import * as React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import DynamicRowChild from './DynamicRowChild';
import { Row } from '../../context/context'
import { useContext, useState, useEffect } from 'react'
import { MatrixContext } from '../../context/context';
import { blueGrey } from '@mui/material/colors'


interface IProps {
  row: Row
  index: number
}


export default function DynamicRowParent(props: IProps) {

  const {
    row,
    index,
  } = props

  const { nearest, actions } = useContext(MatrixContext)

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
            <DynamicRowChild
              key={ob.id} 
              i={i}
              row={row}
              ob={ob}
              hovered={hovered}
            />
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
