

function createData(
  dataName: string,
  cellVal1: number,
  cellVal2: number,
  sum: number,
) {
  return { dataName, cellVal1, cellVal2, sum };
}

export const rows = [
  createData('Cell Value M = 1', 1, 5, 6),
  createData('Cell Value M = 2', 2, 2, 4),
  createData('Average Values', 1.5, 3.5, 5)
]

