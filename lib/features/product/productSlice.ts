import {
  createSlice,
  createEntityAdapter,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit'

export interface Product {
  qty: number
  id: string
}

const productEntity = createEntityAdapter<Product>()

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: productEntity.getInitialState(),
  },
  reducers: {
    addProduct(
      state,
      { payload: { initialValue } }: PayloadAction<{ initialValue: number }>,
    ) {
      productEntity.addOne(state.products, {
        qty: initialValue,
        id: nanoid(),
      })
    },
    updateValue(state, action: PayloadAction<{ id: string; qty: number }>) {
      productEntity.upsertOne(state.products, action)
    },
    removeCounter(state, { payload }: PayloadAction<string>) {
      productEntity.removeOne(state.products, payload)
    },
  },
})

export const productActions = productSlice.actions

export type ProductSlice = {
  [productSlice.name]: ReturnType<(typeof productSlice)['reducer']>
}

export const productSelectors = productEntity.getSelectors<ProductSlice>(
  (state) => state[productSlice.name].products,
)
