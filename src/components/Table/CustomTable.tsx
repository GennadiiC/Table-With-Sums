import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container'
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import Paper from '@mui/material/Paper';
import CircleIcon from '@mui/icons-material/Circle';
import DynamicRowParent from './DynamicRowParent';
import { useContext, useState } from 'react'
import { MatrixContext } from '../../context/context';
import { useCalculateAverage } from './useCalculateAverage';


export default function CustomTable () {

  const { matrix, columnsValue } = useContext(MatrixContext)
  
  return (
    <Container fixed>
      <TableContainer
        component={Paper}
        elevation={2}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              {
                Array.from({length: columnsValue}, (item, i) => i + 1)
                  .map(unit => 
                    <TableCell key={unit} align="center">Cell values column {unit}</TableCell>
                  )
              }
              <TableCell align="center">Sum values</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              matrix.map((row, index) => 
                <DynamicRowParent 
                  key={row.id}
                  row={row}
                  index={index}
                />
              )
            }
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>Average Values</TableCell>
              {
                Array.from({length: columnsValue}, (item, i) => i + 1)
                  .map(unit => 
                    <TableCell key={unit} align="center">
                      {useCalculateAverage(`col${unit}`)} 
                    </TableCell>
                  )
              }
              <TableCell align="center">
                <CircleIcon />
              </TableCell>
              <TableCell align="center">
                <DoNotTouchIcon />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}