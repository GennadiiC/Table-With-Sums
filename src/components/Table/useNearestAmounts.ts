import { useContext, useState, useEffect } from 'react'
import { MatrixContext } from '../../context/context';
import { blueGrey } from '@mui/material/colors';

export const useNearestAmounts = (id: string) => {

  const { nearest } = useContext(MatrixContext)

  const [bg, setBg] = useState<string | null>(null)

  useEffect(() => {
    nearest && nearest.includes(id) ? setBg(blueGrey[50]) : setBg(null)
  }, [nearest])

  return bg
}