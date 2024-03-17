import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/lib/features/counter/counterSlice';
import { productSlice } from './features/product/productSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
