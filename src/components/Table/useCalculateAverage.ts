import { useState, useContext, useEffect } from "react"
import { MatrixContext } from "../../context/context"
import { Cell, Row } from "../../context/context"


export const useCalculateAverage = (id: string): number => {

  const { matrix, rowsValue } = useContext(MatrixContext)

  const [average, setAverage] = useState<number>(0)
  
  useEffect(() => {
    if (matrix.length > 0) {
      let total: number = matrix.reduce<number>((acc: number, currEl: Row) => {
        let target = currEl.array.find((cell: Cell): boolean => cell.id.includes(id))
        return target!.amount + acc
      }, 0)
      setAverage(total)
    }
  }, [rowsValue, matrix])
  
  return Number((average / rowsValue).toFixed(2))
}