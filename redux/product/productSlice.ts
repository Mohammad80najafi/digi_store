import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type ProductInCart = Product & {
  quantity: number;
};

interface ProductState {
  products: ProductInCart[];
  totalPrice: number;
}

const initialState: ProductState = {
  products: [],
  totalPrice: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
        toast.success('در سبد خرید وجود داد به تعداد افزوده شد');
      } else {
        state.products.push({ ...product, quantity: 1 });
        toast.success('به سبد خرید افزوده شد');
      }
      state.totalPrice = state.products.reduce(
        (total, p) => total + p.price * p.quantity,
        0,
      );
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProductIndex = state.products.findIndex(
        (p) => p.id === productId,
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          toast.success('از تعداد یکی کم شد');
        } else {
          state.products.splice(existingProductIndex, 1);
          toast.success('از سبد خرید حذف شد');
        }
        state.totalPrice = state.products.reduce(
          (total, p) => total + p.price * p.quantity,
          0,
        );
      }
    },
    deleteProducts: (state, action: PayloadAction<number>) => {
      const idToDelete = action.payload;

      state.products = state.products.filter((product) => {
        if (product.id === idToDelete) {
          return false;
        }
        return true;
      });

      state.totalPrice = state.products.reduce(
        (total, p) => total + p.price * p.quantity,
        0,
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.products.find((p) => p.id === id);

      if (existingProduct) {
        existingProduct.quantity = quantity;
        state.totalPrice = state.products.reduce(
          (total, p) => total + p.price * p.quantity,
          0,
        );
        toast.success('تعداد به روز شد');
      }
    },
  },
});

export default productSlice.reducer;
export const { addProduct, removeProduct, deleteProducts, updateQuantity } =
  productSlice.actions;
