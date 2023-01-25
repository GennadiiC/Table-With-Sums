import * as React from 'react'
import { useState } from 'react'
var _ = require('lodash')

type actions = {
  setRowsValue: React.Dispatch<React.SetStateAction<number>>
  setColumnsValue: React.Dispatch<React.SetStateAction<number>>
  generateRandomArr: (rows: number, columns: number) => void
  addRowHandler: () => void
}

interface MatrixContextType {
  rowsValue: number
  columnsValue: number
  matrix: Row[]
  actions: actions
}

type Props = { children: React.ReactNode }


export type Cell = {
  id: string 
  amount: number
}

export type Row = {
  id: number
  array: Cell[],
  total: number
}

export const MatrixContext = React.createContext<MatrixContextType>({} as MatrixContextType)

export const Provider = ({ children }: Props) => {

  const [rowsValue, setRowsValue] = useState<number>(0)
  const [columnsValue, setColumnsValue] = useState<number>(0)
  const [matrix, setMatrix] = useState<Array<Row>>([])

  const generateRandomArr = (rows: number, columns: number) => {

    let randomArr: Row[] = []

    for (let x = 0; x < rows; x++) {
      const rowArr: Row = {
        id: x + 1,
        array: [],
        total: 0
      }

      for (let y = 0; y < columns; y++) {
        let cell: Cell = {
          id: `row${x + 1}-col${y + 1}`,
          amount: Math.floor(Math.random() * (rows * columns)) + 1
        }
        rowArr.array.push(cell)
        rowArr.total += cell.amount
      }
      randomArr.push(rowArr)
    }
    setMatrix(randomArr)
  }

  const addRowHandler = () => {
    const newRowArr: Row = {
      id: matrix.length + 1,
      array: [],
      total: 0
    }

    for (let y = 0; y < columnsValue; y++) {
      let cell: Cell = {
        id: `row${matrix.length + 1}-col${y + 1}`,
        amount: Math.floor(Math.random() * (rowsValue * columnsValue)) + 1
      }
      newRowArr.array.push(cell)
      newRowArr.total += cell.amount
    }
    setMatrix(prev => [...prev, newRowArr])
    setRowsValue(prev => prev += 1)
  }


  return (
    <MatrixContext.Provider 
      value={{
        rowsValue,
        columnsValue,
        matrix,
        actions: {
          setColumnsValue,
          setRowsValue,
          generateRandomArr,
          addRowHandler
        }
      }}
    >
      { children }
    </MatrixContext.Provider>
  )
}