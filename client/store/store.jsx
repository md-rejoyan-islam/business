import { configureStore } from "@reduxjs/toolkit";
import { graySlice } from "@/features/gray/graySlice";
import { dyeingSlice } from "@/features/dyeing/dyeingSlice";
import { productSlice } from "@/features/products/productSlice";
import { chalanSlice } from "@/features/chalan/chalanSlice";

export const store = configureStore({
  reducer: {
    [graySlice.reducerPath]: graySlice.reducer,
    [dyeingSlice.reducerPath]: dyeingSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [chalanSlice.reducerPath]: chalanSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      //   rtkQueryGlobalLogger,
      graySlice.middleware,
      dyeingSlice.middleware,
      productSlice.middleware,
      chalanSlice.middleware
    ),
  devTools: true,
  //   devTools: import.meta.env.VITE_NODE_ENV === "development",
});
