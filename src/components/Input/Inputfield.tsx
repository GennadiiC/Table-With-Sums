import * as React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useContext, useEffect } from 'react'
import { MatrixContext } from '../../context/context'
import { useForm, SubmitHandler, Controller } from "react-hook-form";

interface IFormInput {
  rowsInput: string | number 
  columnsInput: string | number 
}


export default function Inputfield() {

  const {
    matrix,
    actions
  } = useContext(MatrixContext)

  const {
    control, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInput>({
    defaultValues: {
      columnsInput: '',
      rowsInput: ''
    }
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState.isSubmitSuccessful, reset])

  
  const onSubmit: SubmitHandler<IFormInput> = data => {
    if (!Number.isNaN(data.rowsInput) && !Number.isNaN(data.columnsInput)) {
      actions.setRowsValue(Number(data.rowsInput))
      actions.setColumnsValue(Number(data.columnsInput))
      actions.generateRandomArr(Number(data.rowsInput), Number(data.columnsInput))
      reset()
    }
    
    // console.log(data)
  }
  

  return (
    <>
      <Box
        component="form"
        autoComplete="off"
        sx={{
          m: 3,
          display: 'flex',
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="rowsInput"
          control={control}
          render={({ field }) => 
            <TextField
              required
              id="outlined-required"
              label="Enter rows quantity"
              inputProps={{ inputMode: 'numeric', pattern: '^(0|[1-9][0-9]?|100)$' }}
              helperText={'numbers between 0 and 100'}
              value={field.value}
              onChange={field.onChange}
            />
          }
        />
        <Controller
          name="columnsInput"
          control={control}
          render={({ field }) => 
            <TextField
              required
              id="outlined-required"
              label="Enter columns quantity"
              inputProps={{ inputMode: 'numeric', pattern: '^(0|[1-9][0-9]?|100)$' }}
              helperText={'numbers between 0 and 100'}
              value={field.value}
              onChange={field.onChange}
            />
          }
        />
        <TextField type='submit' value='Submit' />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 3
        }}
      >
        {
          matrix.length > 0 &&
          <Button
            variant="outlined"
            color="inherit"
            onClick={actions.addRowHandler}
          >
            Add row
          </Button>
        }
      </Box>
    </>
    
  )
}
