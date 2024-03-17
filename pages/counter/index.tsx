import React from 'react'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'

import { decrement, increment } from '@/lib/features/counter/counterSlice'
import { Box, Button, Stack, Typography } from '@mui/material'


const Counter = () => {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <main>
      <Box py={8}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Typography mr={4}>Counter number </Typography>
          <Button variant='outlined'>{count}</Button>
          <Button
            variant='contained'
            style={{ width: "88px" }}
            onClick={() => {
              dispatch(increment())
            }}>
            Cộng
          </Button>
          <Button
            variant='contained'
            style={{ width: "88px" }}
            onClick={() => {
              dispatch(decrement())
            }}>
            Trừ
          </Button>
        </Stack>
      </Box>
    </main>
  )
}

export default Counter
