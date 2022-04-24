/* eslint-disable import/no-import-module-exports */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import monitorReducersEnhancer from "./enhancers/monitorReducer";
import loggerMiddleware from "./middleware/logger";
import authSlice from "./slices/onboarding";
import inventorySlice from "./slices/inventory";

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: { auth: authSlice, inventory: inventorySlice },
    middleware: [loggerMiddleware, ...getDefaultMiddleware()],
    preloadedState,
    enhancers: [monitorReducersEnhancer],
  });

  // if (process.env.NODE_ENV !== "production" && module.hot) {
  //   module.hot.accept("./slices/onboarding", () =>
  //     store.replaceReducer(onboarding)
  //   );
  // }

  return store;
}
