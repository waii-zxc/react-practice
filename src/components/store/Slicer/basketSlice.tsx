import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getBasketFromFirestore, clearBasketInFirestore, saveBasketToFirestore } from '../../../firebase';

interface BasketItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface BasketState {
  items: BasketItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export const fetchBasketItems = createAsyncThunk<BasketItem[]>('basket/fetchBasketItems', async () => {
  const fetchedItems = await getBasketFromFirestore();
  return fetchedItems || [];
});

export const clearBasket = createAsyncThunk<void>('basket/clearBasket', async () => {
  await clearBasketInFirestore();
  return;
});

const initialState: BasketState = {
  items: [],
  status: 'idle',
  error: null,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveBasketToFirestore(state.items); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBasketItems.fulfilled, (state, action: PayloadAction<BasketItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(clearBasket.fulfilled, (state) => {
        state.items = [];
        saveBasketToFirestore(state.items); 
      });
  },
});

export const { removeItem } = basketSlice.actions;
export default basketSlice.reducer;
