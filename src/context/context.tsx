import * as React from 'react'
import { useState } from 'react'
var _ = require('lodash')

type actions = {
  setRowsValue: React.Dispatch<React.SetStateAction<number>>
  setColumnsValue: React.Dispatch<React.SetStateAction<number>>
  generateRandomArr: (rows: number, columns: number) => void
  addRowHandler: () => void
  deleteRowHandler: (id: number) => void
  // incrementer: (e: React.MouseEvent<HTMLElement>) => void
  incrementer: (rowId: number, cellId: string) => void
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
  amount: number,
  percentage: number
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

    let matrixArr: Row[] = []

    for (let x = 0; x < rows; x++) {
      let rowArr: Row = {
        id: x + 1,
        array: [],
        total: 0
      }

      for (let y = 0; y < columns; y++) {
        let cell: Cell = {
          id: `row${x + 1}-col${y + 1}`,
          amount: Math.floor(Math.random() * (rows * columns)) + 1,
          percentage: 0 
        }
        rowArr.array.push(cell)
        rowArr.total += cell.amount
      }
      rowArr.array.map((cell, i, arr) => {
        cell.percentage = Number(((100 * cell.amount) / rowArr.total).toFixed(2))
        return [...arr]
      })
      matrixArr.push(rowArr)
    }
    setMatrix(matrixArr)
  }

  const addRowHandler = () => {
    const newRowArr: Row = {
      id: matrix[matrix.length - 1].id + 1,
      array: [],
      total: 0
    }

    for (let y = 0; y < columnsValue; y++) {
      let cell: Cell = {
        id: `row${matrix.length + 1}-col${y + 1}`,
        amount: Math.floor(Math.random() * (rowsValue * columnsValue)) + 1,
        percentage: 0
      }
      newRowArr.array.push(cell)
      newRowArr.total += cell.amount
    }
    newRowArr.array.map((cell, i, arr) => {
      cell.percentage = Number(((100 * cell.amount) / newRowArr.total).toFixed(2))
      return [...arr]
    })
    setMatrix(prev => [...prev, newRowArr])
    setRowsValue(prev => prev += 1)
  }

  const deleteRowHandler = (id: number) => {
    setMatrix(prev => {
      return prev.filter(row => row.id !== id)
    })
    setRowsValue(prev => prev -= 1)
  }


  const incrementer = (rowId: number, cellId: string) => {
    
    setMatrix((prev) => {

      let targetRow: Row | undefined = 
        prev.find<Row>((row): row is Row => row.id === rowId)
      let targetCell: Cell | undefined = 
        targetRow!.array.find<Cell>((cell): cell is Cell => cell.id === cellId)
      targetCell!.amount += 1
      targetRow!.total += 1
      targetRow!.array.map((cell, i, arr) => {
        cell.percentage = Number(((100 * cell.amount) / targetRow!.total).toFixed(2))
        return [...arr]
      })
        
      return [...prev]
    })
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
          addRowHandler,
          deleteRowHandler,
          incrementer
        }
      }}
    >
      { children }
    </MatrixContext.Provider>
  )
}