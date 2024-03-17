import React from 'react'

import { useAppSelector, useAppDispatch } from '@/lib/hooks'

import { decrement, increment } from '@/lib/features/counter/counterSlice'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { productSelectors, productActions } from '@/lib/features/product/productSlice'
import Recipe from './Reciepe'



const Cart = () => {
  // The `state` arg is correctly typed as `RootState` already

  const productsIds = useAppSelector((state) =>
    productSelectors.selectIds(state),
  )
  const appDispatch = useAppDispatch()
  const add = () => {
    appDispatch(productActions.addProduct({ initialValue: 1 }))
  }
  

  return (
    <main>
      <Box py={8}>
        <Button variant='contained' onClick={add}>
          Add RECIPE
        </Button>
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          {productsIds.map((id) => (
            <Recipe key={id} id={id} />
          ))}
        </Stack>
        
        <Button variant='contained'>
        <Link href={`/counter/ree`} underline="none" color="#FFF">XEM THANH TOÁN</Link>
        </Button>
        
        
        
      </Box>
    </main>
  )
}

export default Cart