import * as React from 'react';
import CustomTable from './components/Table/CustomTable';
import Inputfield from './components/Input/Inputfield';
import Container from '@mui/material/Container'
import { useContext } from 'react'
import { MatrixContext } from './context/context';

export default function App() {

  const { rowsValue, columnsValue} = useContext(MatrixContext)

  // console.log(rowsValue, columnsValue)

  return (
    <Container>
      <Inputfield />
      {rowsValue > 0 && columnsValue > 0 && <CustomTable />}
    </Container>
  )
}
